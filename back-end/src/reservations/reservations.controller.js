const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { destroy } = require('../db/connection');

// ROUTER MIDDLEWARE

//validates that reservation has required inputs
function hasRequiredInputs(req, res, next) {
  console.log('req', req);
  const reservation = req.body.data;
  if (!reservation) {
    return next({
      status: 400,
      message: `Reservation must include all required fields`,
    });
  }
  const REQUIRED_PROPERTIES =   [
    'first_name',
    'last_name',
    'mobile_number',
    'reservation_date',
    'reservation_time',
    'people',
  ];
  REQUIRED_PROPERTIES.forEach((property) => {
    if (!reservation[property]) {
      return next({
        status: 400,
        message: `Reservation must include a ${property}`,
      });
    }
  })
  res.locals.reservation = reservation;
  next();
}

//validates that party size > 0
function hasValidNumOfPpl(req, res, next) {
  const people = req.body.data.people;
  if (people < 1 || !people || typeof people !== 'number') {
    return next({
      status: 400,
      message: 'Number of people in party must be at least 1',
    });
  }
  next();
}

// validates that reservation date is a date
function hasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!(dateFormat.test(date))) {
    return next({
      status: 400,
      message: 'Reservation must have a valid reservation_date',
    });
  }
  next();
}

// validates that reservation time is a time
function hasValidTime(req, res, next) {
  const time = req.body.data.reservation_time;
  const timeFormat = /\d\d:\d\d/;
  if (!(timeFormat.test(time))) {
    return next({
      status: 400,
      message: 'Reservation must have a valid reservation_time',
    });
  }
  next();
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

// ROUTE HANDLERS

/**
 * Create new reservation
 */
async function create(req, res, next) {
  const newReservation = res.locals.reservation;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

// Get reservation by ID
async function read(req, res) {
  const id = res.locals.reservation.reservation_id;
  const reservation = await service.read(id);
  res.json({ data: reservation });
}

/**
 * Get all reservations
 */
async function list(req, res) {
  const date = req.query.date;
  const reservations = await service.list(date);
  res.json({ data: reservations });
}

module.exports = {
  create: [hasRequiredInputs, hasValidNumOfPpl, hasValidDate, hasValidTime, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  // update: [asyncErrorBoundary(reservationExists), hasRequiredInputs, hasValidNumOfPpl, asyncErrorBoundary(update)],
  // delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};



// Update reservation by ID _INCOMPLETE
// async function update(req, res) { 
//   const reservationId = req.params.reservationId;
//   const updatedRes = res.locals.reservation;
//   if (!updatedRes.id) {
//     updatedRes.id = reservationId;
//   }
//   res.json({ data: updatedRes });
// }

// Delete reservation by ID