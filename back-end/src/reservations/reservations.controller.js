const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// ROUTER MIDDLEWARE

//validates that reservation has required inputs
function hasRequiredInputs(req, res, next) {
  const reservation = req.body.data;
  if (!reservation) {
    return next({
      status: 400,
      message: `Reservation must include all required fields`,
    });
  }
  const REQUIRED_PROPERTIES = [
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
  res.locals.date = date;
  next();
}

// validates that reservation date is in the future
function hasFutureDate(req, res, next) {
  const dateTime = res.locals.date + ' ' + res.locals.time;
  const reservationDate = new Date(dateTime);
  const todaysDate = new Date();
  if (todaysDate >= reservationDate) {
    return next({
      status: 400,
      message: 'Reservation must occur in the future',
    });
  }
  next();
}

// validates that reservation date is not on a Tuesday
function hasValidDay(req, res, next) {
  const dateTime = res.locals.date + ' ' + res.locals.time;
  const reservationDate = new Date(dateTime);
  const day = reservationDate.getDay();
  if (day === 2) {
    return next({
      status: 400,
      message: 'Restaurant is closed on Tuesdays. Please select a different date.',
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
  res.locals.time = time;
  next();
}

// validates that reservation time is within permitted timeframe
function hasPermittedTime(req, res, next) {
  const hour = res.locals.time.split(':')[0];
  const min = res.locals.time.split(':')[1];

  const reservationTime = new Date();
  reservationTime.setHours(hour, min);

  const openingTime = new Date();
  openingTime.setHours(10, 30);

  const lastCall = new Date();
  lastCall.setHours(21, 30);

  if (reservationTime >= openingTime && reservationTime <= lastCall) {
    return next();
  }
  return next({
    status: 400,
    message: 'Reservation must occur between 10:30AM and 9:30PM',
  });
}

// validates that new reservation has new status
function hasNewStatus(req, res, next) {
  const status = res.locals.reservation.status;
  if (!status || status === 'booked') {
    return next();
  }
  return next({
    status: 400,
    message: `New reservation can not have ${status} status`,
  });
}

// validates that a reservation to read/update/delete exists
async function reservationExists(req, res, next) {
  const reservationId = req.params.reservation_id;
  const foundReservation = await service.read(reservationId);
  if (!foundReservation) {
    next({
      status: 404,
      message: `Reservation ID not found: ${reservationId}`,
    });
  }
  res.locals.reservation = foundReservation;
  res.locals.reservationId = reservationId;
  return next();
}

// validates updated reservation status 
function hasValidStatus(req, res, next) {
  const status = req.body.data.status;
  const statusOptions = ['booked', 'seated', 'finished'];
  if (!status || !statusOptions.includes(status)) {
    return next({
      status: 400,
      message: "Status must be 'booked', 'seated', or 'finished': unknown status received",
    });
  }
  res.locals.status = req.body.data;
  next();
}

// validates status can be updated (reservation is not finished)
function notFinished(req, res, next) {
  const status = res.locals.reservation.status;
  if (status === 'finished') {
    return next({
      status: 400,
      message: 'A finished reservation cannot be updated',
    });
  }
  return next();
}

// validates that date query is a date
function queryHasDate(req, res, next) {
  const date = req.query.date;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!(dateFormat.test(date))) {
    return next({
      status: 400,
      message: 'Path must have a valid reservation_date',
    });
  }
  next();
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
  const query = Object.keys(req.query)[0];
  let data;
  if (query === 'date') {
    data = await service.list(req.query.date);
  } else {
    data = await service.search(req.query.mobile_number);
  }
  res.json({ data });
}

// update reservation status
async function update(req, res) {
  const id = res.locals.reservationId;
  const newStatus = res.locals.status;
  const status = await service.update(id, newStatus);
  res.status(200).json({ data: status });
}

module.exports = {
  create: [hasRequiredInputs, 
    hasValidNumOfPpl, 
    hasValidDate, 
    hasValidTime, 
    hasFutureDate, 
    hasValidDay, 
    hasPermittedTime, 
    hasNewStatus,
    asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), 
    hasValidStatus, 
    notFinished,
    asyncErrorBoundary(update)],
  // delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
