exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE favorites(
      id TEXT,
      search_term TEXT)`;
    return knex.raw(createQuery);
  };
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE favorites`;
    return knex.raw(dropQuery);
  };