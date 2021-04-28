exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id");
    table.string("title",10000);
    table.integer("runtime_in_minutes");
    table.enum("rating", ["G", "PG", "PG-13", "R", "NC-17", "NR"]);//enum / enu — table.enu(col, values, [options])
    table.text("description",10000);//string — table.string(name, [length])
    table.string("image_url",10000);
    table.timestamps(true, true);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("movies");//drop table `users`
};