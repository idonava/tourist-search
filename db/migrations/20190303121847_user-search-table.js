exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE searches(
      id TEXT,
      search_term TEXT,
      service TEXT,
      time TIMESTAMP,
      num_of_results TEXT
    )`;
    return knex.raw(createQuery);
  };
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE searches`;
    return knex.raw(dropQuery);
  };