const knex = require("../db/connection");

// insert new reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

// query list of reservations for specified date excluding finished/cancelled
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservation_time");
}

// query single reservation by ID
function read(id) {
  return knex("reservations").select("*").where({ reservation_id: id }).first();
}

// update status of existing reservation with specified ID
function updateStatus(reservation_id, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(newStatus, "*")
    .then((records) => records[0]);
}

// update details of existing reservation with specified ID
function updateRes(reservation_id, updatedRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(updatedRes, "*")
    .then((records) => records[0]);
}

// query list of all past & current reservations with matching mobile number
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
  updateRes,
  search,
};
