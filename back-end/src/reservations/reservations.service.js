const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_date": date })
    .whereNotIn("status", ["finished"])
    .orderBy("reservation_time");
}

function read(id) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": id })
    .first();
}

function update(reservation_id, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(newStatus, "*")
    .then((records) => records[0]);
}

module.exports = {
  create,
  list,
  read,
  update,
};