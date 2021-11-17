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
    .orderBy("reservation_time");
}

function read(id) {
  return knex("reservations")
    .select("*")
    .where({ "reservation_id": id });
}

module.exports = {
  create,
  list,
  read,
};