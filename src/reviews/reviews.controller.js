const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");


async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    next({ status: 404, message: "Review cannot be found." });
  }
}

async function list(req, res, next) {
  const { movie } = res.locals;
  const data = await service.list(movie[0].movie_id);
  res.json({ data });
  console.log('debug',data)
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  console.log()
  const newData = await service.update(updatedReview);
  res.json({ data: newData });
  console.log('debug',)
}

async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};