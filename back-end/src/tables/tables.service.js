const knex = require("../db/connection");

// insert new table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

// query list of all tables, sorted by table name
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

// query single table by ID
function read(id) {
  return knex("tables").select("*").where({ table_id: id }).first();
}

// query single reservation by reservation ID
function readReservation(id) {
  return knex("reservations").select("*").where({ reservation_id: id }).first();
}

// updates specified reservation w/ 'seated' status
// & updates specified table w/ reservation ID
function seat(table_id, reservation_id) {
  return knex.transaction(async (transaction) => {
    await knex("reservations")
      .where({ reservation_id })
      .update({ status: "seated" })
      .transacting(transaction);

    return knex("tables")
      .where({ table_id })
      .update({ reservation_id }, "*")
      .transacting(transaction)
      .then((records) => records[0]);
  });
}

// updates reservation w/ 'finished' status
// & updates table to remove reservation ID
function finish(table) {
  return knex.transaction(async (transaction) => {
    await knex("reservations")
      .where({ reservation_id: table.reservation_id })
      .update({ status: "finished" })
      .transacting(transaction);

    return knex("tables")
      .where({ table_id: table.table_id })
      .update({ reservation_id: null }, "*")
      .transacting(transaction)
      .then((records) => records[0]);
  });
}

module.exports = {
  create,
  list,
  read,
  readReservation,
  seat,
  finish,
};
