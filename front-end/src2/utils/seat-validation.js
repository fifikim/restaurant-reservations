import { readRes, readTable } from "../utils/api";

// send get request to read reservation
function loadReservation(reservation_id) {
  const ac = new AbortController();
  return readRes(reservation_id, ac.signal);
}

// send get request to read reservation
function loadTable(table_id) {
  const ac = new AbortController();
  return readTable(table_id, ac.signal);
}

export default async function validateSeating(table_id, reservation_id) {
  const errors = [];
  const table = await loadTable(table_id);
  const capacity = table.capacity;
  const reservation = await loadReservation(reservation_id);

  console.log("table", table);
  console.log("res", reservation);

  // validate table capacity > party size
  if (capacity < reservation.people) {
    errors.push("Table capacity is too small. Please select a different table");
  }

  // validate table is free
  if (table.reservation_id) {
    errors.push("Table is occupied. Please select a different table.");
  }

  console.log("errors", errors);
  return errors;
}
