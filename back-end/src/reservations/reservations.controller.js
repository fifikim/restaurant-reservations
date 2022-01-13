const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  REQUIRED_PROPERTIES.forEach((property) => {
    if (!reservation[property]) {
      return next({
        status: 400,
        message: `Reservation must include a ${property}`,
      });
    }
  });
  res.locals.reservation = reservation;
  next();
}

//validates that party size > 0
function hasValidNumOfPpl(req, _res, next) {
  const people = req.body.data.people;
  if (people < 1 || !people || typeof people !== "number") {
    return next({
      status: 400,
      message: "Number of people in party must be at least 1",
    });
  }
  next();
}

// validates that reservation date is a date
function hasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!dateFormat.test(date)) {
    return next({
      status: 400,
      message: "Reservation must have a valid reservation_date",
    });
  }
  res.locals.date = date;
  next();
}

// validates that reservation date is in the future
function hasFutureDate(_req, res, next) {
  const dateTime = res.locals.date + " " + res.locals.time;
  const reservationDate = new Date(dateTime).getUTCDate();
  const todaysDate = Date.now().getUTCDate();
  if (todaysDate >= reservationDate) {
    return next({
      status: 400,
      message: "Reservation must occur in the future",
    });
  }
  next();
}

// validates that reservation date is not on a Tuesday
function hasValidDay(_req, res, next) {
  const dateTime = res.locals.date + " " + res.locals.time;
  const reservationDate = new Date(dateTime);
  const day = reservationDate.getDay();
  if (day === 2) {
    return next({
      status: 400,
      message:
        "Restaurant is closed on Tuesdays. Please select a different date.",
    });
  }
  next();
}

// validates that reservation time is a time
function hasValidTime(req, res, next) {
  const time = req.body.data.reservation_time;
  const timeFormat = /\d\d:\d\d/;
  if (!timeFormat.test(time)) {
    return next({
      status: 400,
      message: "Reservation must have a valid reservation_time",
    });
  }
  res.locals.time = time;
  next();
}

// validates that reservation time is within permitted timeframe
function hasPermittedTime(_req, res, next) {
  const hour = res.locals.time.split(":")[0];
  const min = res.locals.time.split(":")[1];

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
    message: "Reservation must occur between 10:30AM and 9:30PM",
  });
}

// validates that new reservation has default status
function hasBookedStatus(_req, res, next) {
  const status = res.locals.reservation.status;
  if (!status || status === "booked") {
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

// validates updated reservation status is permitted
function hasValidStatus(req, res, next) {
  const status = req.body.data.status;
  const statusOptions = ["booked", "seated", "finished", "cancelled"];
  if (!status || !statusOptions.includes(status)) {
    return next({
      status: 400,
      message:
        "Status must be 'booked', 'seated', or 'finished': unknown status received",
    });
  }
  res.locals.status = req.body.data;
  next();
}

// validates status can be updated (reservation is not finished)
function notFinished(_req, res, next) {
  const status = res.locals.reservation.status;
  if (status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated",
    });
  }
  return next();
}

// CRUD OPERATIONS

// Create new reservation
async function create(_req, res) {
  const newReservation = res.locals.reservation;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

// Get reservation by ID
async function read(_req, res) {
  const id = res.locals.reservation.reservation_id;
  const reservation = await service.read(id);
  res.json({ data: reservation });
}

// get reservations list by date or mobile_number
async function list(req, res) {
  const query = Object.keys(req.query)[0];
  let data;
  if (query === "date") {
    // const date = new Date(req.query.date);
    data = await service.list(req.query.date);
  } else {
    data = await service.search(req.query.mobile_number);
  }
  res.json({ data });
}

// update reservation status
async function updateStatus(_req, res) {
  const id = res.locals.reservationId;
  const newStatus = res.locals.status;
  const status = await service.updateStatus(id, newStatus);
  res.status(200).json({ data: status });
}

// update reservation
async function update(req, res) {
  const id = res.locals.reservationId;
  const updatedRes = req.body.data;
  const data = await service.updateRes(id, updatedRes);
  res.status(200).json({ data });
}

module.exports = {
  create: [
    hasRequiredInputs,
    hasValidNumOfPpl,
    hasValidDate,
    hasValidTime,
    hasFutureDate,
    hasValidDay,
    hasPermittedTime,
    hasBookedStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    notFinished,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasRequiredInputs,
    hasValidNumOfPpl,
    hasValidDate,
    hasValidTime,
    hasFutureDate,
    hasValidDay,
    hasPermittedTime,
    asyncErrorBoundary(update),
  ],
  list: [asyncErrorBoundary(list)],
};
