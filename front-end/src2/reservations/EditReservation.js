import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readRes, updateRes } from "../utils/api";
import ReservationForm from "./ReservationForm";

/**
 * renders page view for Edit Reservation route
 *
 * @returns {JSX.Element}
 */
function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    readRes(reservation_id).then(setReservation);
  }, [reservation_id]);

  // reservation form submit button handler
  // updates reservation via api & redirects to reservation date Dashboard
  function editRes(reservation) {
    updateRes(reservation).then((updatedReservation) =>
      history.push(`/dashboard?date=${updatedReservation.reservation_date}`)
    );
  }

  // cancel button handler: redirects to previous page
  function cancel() {
    history.goBack();
  }

  // conditional render:
  // renders 'Loading' message while reservation loads,
  // then renders form pre-filled with saved reservation details
  const loadForm = reservation.reservation_id ? (
    <ReservationForm
      onCancel={cancel}
      initialFormState={reservation}
      onSuccess={editRes}
    />
  ) : (
    <p>Loading...</p>
  );

  return (
    <>
      <h2>Edit Reservation</h2>

      {loadForm}
    </>
  );
}

export default EditReservation;
