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

  function editRes(reservation_id) {    // onSuccess handler: edits res via api
    updateRes(reservation_id)         // put call & redirects to res date dashboard
      .then((updatedReservation) => 
        history.push(`/dashboard?date=${updatedReservation.reservation_date}`));
  }

  function cancel() {             // cancel button redirects to previous page
    history.goBack();
  }

  const loadForm = reservation.reservation_id ? (   // conditional render: 
    <ReservationsForm                         // renders loading message while  
      onCancel={cancel}                       // reservation state obj loads so 
      initialFormState={reservation}          // initial form state contains any 
      onSuccess={editRes}                     // saved data (or is blank)
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