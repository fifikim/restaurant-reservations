const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// ROUTER MIDDLEWARE

//validates that table has required inputs to create
function hasRequiredInputs(req, res, next) {
  const table = req.body.data;
  if (!table) {
    return next({
      status: 400,
      message: `New table must include all required fields`,
    });
  }
  const REQUIRED_PROPERTIES =   [
    'table_name',
    'capacity',
  ];
  REQUIRED_PROPERTIES.forEach((property) => {
    if (!table[property]) {
      return next({
        status: 400,
        message: `Table must include a ${property}`,
      });
    }
  })
  res.locals.table = table;
  next();
}

//validates that table name >= 2 characters 
function hasValidName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (!tableName || tableName.length < 2) {
    return next({
      status: 400,
      message: 'New table must include table_name at least 2 characters in length',
    });
  }
  next();
}

// validates that table capacity is >= 1
function hasMinCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (!capacity || capacity <1 || typeof capacity !== 'number') {
    return next({
      status: 400,
      message: 'Reservation must have a valid capacity of at least 1',
    });
  }
  res.locals.capacity = capacity;
  next();
}

// validates that a table to read/update/delete exists
async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  const foundTable = await service.read(tableId);
  if (!foundTable) {
    return next({
      status: 404,
      message: `Table ID not found: ${tableId}`,
    });
  }
  res.locals.table = foundTable;
  return next();
}

//validates that table has required inputs to update
function hasReservationId(req, res, next) {
  const seatRequest = req.body.data;
  if (!seatRequest) {
    return next({
      status: 400,
      message: `New table must include all required fields`,
    });
  }
  if (!seatRequest['reservation_id']) {
    return next({
      status: 400,
      message: `Table must include a reservation_id`,
    });
  }
  res.locals.seatRequest = seatRequest;
  res.locals.reservationId = seatRequest.reservation_id;
  next();
}

// look up reservations by reservation_id in request body
// save res to res.locals.reservation
// validates that a reservation to read/update/delete exists
async function reservationExists(req, res, next) {
  const reservationId = res.locals.reservationId;
  const foundReservation = await service.readReservation(reservationId);
  if (!foundReservation) {
    next({
      status: 404,
      message: `Reservation ID not found: ${reservationId}`,
    });
  }
  res.locals.reservation = foundReservation;
  return next();
}

// look up people at res.locals.reservation.people 
// look up capacity at res.locals.table.capacity
// validates that a table has capacity to seat number of ppl in reservation
async function hasEnoughSeats(req, res, next) {
  const capacity = res.locals.table.capacity;
  const people = res.locals.reservation.people;
  if (people > capacity) {
    return next({
      status: 400,
      message: `Table capacity can not seat party size of ${people}`,
    });
  }
  return next();
}


// validates that a table is free to seat a reservation
async function tableIsFree(req, res, next) {
  const table = res.locals.table;
  const foundReservation = table.reservation_id;
  if (foundReservation !== null) {
    next({
      status: 400,
      message: `Table ${table.table_name} is occupied`,
    });
  }
  return next();
}

// ROUTE HANDLERS


// Create new table
async function create(req, res, next) {
  const newTable = res.locals.table;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

// Read table by table ID
function read(req, res) {
  const table = res.locals.table;
  res.json({ data: table });
}

// Update table by table ID to add reservation_id to tables/reservation_id
async function update(req, res) {
  const seatRequest = res.locals.seatRequest;
  const tableId = res.locals.table.table_id;
  await service.update(tableId, seatRequest);
  const result = await service.read(tableId);
  res.status(200).json({ data: result });
}


// Delete table assignment by table ID
async function destroy(req, res) {

}
 
// List all tables
async function list(req, res) {
  const tables = await service.list();
  res.json({ data: tables });
}

module.exports = {
  create: [hasRequiredInputs, hasValidName, hasMinCapacity, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(tableExists), hasReservationId, reservationExists, hasEnoughSeats, tableIsFree, asyncErrorBoundary(update)],
  // delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
