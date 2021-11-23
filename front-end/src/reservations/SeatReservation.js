import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { seatRes } from '../utils/api';
import SeatForm from './SeatForm';

/**
 * 
 * @returns renders page view for New Reservation route
 */
function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

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
  )
}

export default SeatReservation;