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
    .where({ "table_id": id })
    .first();
}

// read reservation by reservation id
function readReservation(id) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": id })
    .first();
}

// update table by table id
function seat(table_id, seatRequest) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update(seatRequest, "*");
}

// // delete table assignment to reservation_id by table_id
function finish(table_id) {
  const unseat = {"reservation_id": null};
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update(unseat, "*");
}

module.exports = {
  create,
  list,
  read,
  readReservation,
  seat,
  finish,
};