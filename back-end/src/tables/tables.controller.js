const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// ROUTER MIDDLEWARE

//validates that table has required inputs
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
  const tableName = res.locals.table.table_name;
  if (tableName.length < 2) {
    return next({
      status: 400,
      message: 'Table name must be at least 2 characters in length',
    });
  }
  next();
}

// validates that table capacity is >= 1
function hasMinCapacity(req, res, next) {
  const date = req.body.data.reservation_date;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!(dateFormat.test(date))) {
    return next({
      status: 400,
      message: 'Reservation must have a valid reservation_date',
    });
  }
  res.locals.date = date;
  next();
}

// validates that a table to read/update/delete exists
async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  const foundTable = await service.read(tableId);
  if (!foundTable) {
    next({
      status: 404,
      message: `Table ID not found: ${tableId}`,
    });
  }
  res.locals.table = foundTable;
  return next();
}

// validates that a table is free to seat a reservation
function tableIsFree(req, res, next) {
  const tableId = res.locals.table.table_id;
  const foundReservation = res.locals.table.reservation_id;
  if (foundReservation) {
    next({
      status: 404,
      message: `Table ${tableId} is occupied`,
    });
  }
  return next();
}

// validates that a reservation to read/update/delete exists
async function reservationExists(req, res, next) {
  const reservationId = req.params.reservation_id;
  const foundReservation = await service.read(reservationId);
  if (foundReservation) {
    next({
      status: 404,
      message: `Reservation ID not found: ${reservationId}`,
    });
  }
  res.locals.reservation = foundReservation;
  return next();
}


// validates that a table has capacity to seat number of ppl in reservation
async function hasEnoughSeats(req, res, next) {

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

// Update table by table ID
async function update(req, res) {

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
  update: [asyncErrorBoundary(tableExists), tableIsFree, hasEnoughSeats, hasRequiredInputs, asyncErrorBoundary(update)],
  // delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
