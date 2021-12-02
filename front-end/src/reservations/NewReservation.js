import React from "react";
import { useHistory } from "react-router-dom";
import { createRes } from "../utils/api";
import ReservationForm from "./ReservationForm";

/**
 * renders page view for New Reservation route
 * 
 * @returns {JSX.Element}
 */
function NewReservation() {
  const history = useHistory();

  // reservation form submit button handler
  // creates reservation via api & redirects to reservation date Dashboard
  function newRes(reservation) {
    createRes(reservation) 
      .then((newReservation) =>
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
      );
  }

  // cancel button handler: redirects to Dashboard page for current date
  function cancel() {
    history.push(`/dashboard`);
  }

  return (
    <>
      <h2>Create Reservation</h2>

      <ReservationForm onSuccess={newRes} onCancel={cancel} />
    </>
  );
}

export default NewReservation;
