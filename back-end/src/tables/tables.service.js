const knex = require("../db/connection");

// create a new table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

// list all tables sorted by table name
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

// read table by table id
function read(id) {
  return knex("tables")
    .select("*")
    .where({ "table_id": id });
}

// update table by table id
function update(id) {
  return 
}

// delete table assignment to reservation_id by table_id
function destroy(id) {
  return 
}

module.exports = {
  create,
  list,
  read,
  update,
  destroy,
};