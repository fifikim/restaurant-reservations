import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readRes, updateRes } from '../utils/api';
import ReservationsForm from './ReservationsForm';

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    readRes(reservation_id).then(setReservation);
  }, [reservation_id]);

  function editRes(reservation_id) {    // onSuccess handler: creates res via api
    updateRes(reservation_id) // post call & redirects to res date dashboard
      .then((updatedReservation) => 
        history.push(`/dashboard?date=${updatedReservation.reservation_date}`));
  }

  function cancel() {             // cancel button redirects to dashboard page
    history.goBack();
  }

  const loadForm = reservation.reservation_id ? (   // conditional render: renders DeckForm if state 
    <ReservationsForm                 // contains value of deck.id, otherwise will 
      onCancel={cancel}       // display "Loading" message
      initialFormState={reservation}
      onSuccess={editRes}    // edit-specific props passed to Deck Form 
    />
  ) : (
    <p>Loading...</p>
  );

  return (
  <>
    <h2>Edit Reservation</h2>

    {loadForm}
  </>
  )
}

export default EditReservation;