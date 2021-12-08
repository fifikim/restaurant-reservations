import React from 'react';
import { useHistory } from 'react-router-dom';
import { createRes } from '../utils/api';
import ReservationsForm from './ReservationsForm';

/**
 * 
 * @returns renders page view for New Reservation route
 */
function NewReservation() {
  const history = useHistory();

  function newRes(reservation) {    // onSuccess handler: creates res via api
    createRes(reservation) // post call & redirects to res date dashboard
      .then((newReservation) => 
        history.push(`/dashboard?date=${newReservation.reservation_date}`));
  }

  function cancel() {             // cancel button redirects to dashboard page
    history.push(`/dashboard`);
  }

  return (
    <>
    <h2>Create Reservation</h2>

    <ReservationsForm 
      onSuccess={newRes}
      onCancel={cancel}
    />
  </>
  )
}

export default NewReservation;