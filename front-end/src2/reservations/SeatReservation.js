import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { seatRes } from "../utils/api";
import SeatForm from "./SeatForm";

/**
 * renders page view for Seat Reservation route
 * 
 * @returns {JSX.Element}
 */
function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  // cancel button handler: redirect to previous page
  function cancel() {
    history.goBack();
  }

  return (
    <>
      <h2>Seat: Reservation #{reservation_id} </h2>

      <SeatForm
        reservation_id={reservation_id}
        onSuccess={seatRes}
        onCancel={cancel}
      />
    </>
  );
}

export default SeatReservation;
