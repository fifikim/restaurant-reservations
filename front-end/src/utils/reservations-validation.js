function validateFuture(date, time) {
  // check if reservation date is later than today
  const dateTime = date + " " + time;
  const stringToDate = new Date(dateTime);
  const todaysDate = new Date();
  return todaysDate < stringToDate;
}

function validateDay(date, time) {
  // find out what day of week date occurs
  // return false if day of week is Tuesday(2)
  const dateTime = date + " " + time;
  const stringToDate = new Date(dateTime);
  const day = stringToDate.getDay();
  return day !== 2;
}

function validateTime(time) {
  // check that reservation time begins within valid timeframe
  const hour = time.split(":")[0];
  const min = time.split(":")[1];

  const reservationTime = new Date();
  reservationTime.setHours(hour, min);

  const openingTime = new Date();
  openingTime.setHours(10, 30);

  const lastCall = new Date();
  lastCall.setHours(21, 30);

  return reservationTime >= openingTime && reservationTime <= lastCall;
}

export function validateForm(formData) {
  const errors = [];

  // validate day of week
  if (
    !validateDay(formData["reservation_date"], formData["reservation_time"])
  ) {
    errors.push(
      "Restaurant is closed on Tuesdays. Please select a different reservation date."
    );
  }

  // validate future date
  if (
    !validateFuture(formData["reservation_date"], formData["reservation_time"])
  ) {
    errors.push("Please select a future reservation date.");
  }

  // validate time
  if (!validateTime(formData["reservation_time"])) {
    errors.push("Please select a reservation time between 10:30AM and 9:30PM.");
  }

  return errors;
}
