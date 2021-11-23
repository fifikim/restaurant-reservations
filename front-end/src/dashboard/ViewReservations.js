import React from "react";
import { Link } from "react-router-dom";

function ReservationsView({reservations = []}) {
  // if (reservations.length) {
  //   reservations = reservations.filter((res) => res.status !== 'finished');
  // }
  const reservationsList = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
    <th scope="row">{reservation.reservation_id}</th>
    <td>{reservation.first_name}</td>
    <td>{reservation.last_name}</td>
    <td>{reservation.mobile_number}</td>
    <td>{reservation.reservation_time}</td>
    <td>{reservation.people}</td>
    <td data-reservation-id-status={reservation.reservation_id}>
      {reservation.status}
    </td>
    <td>{reservation.status === 'booked' ?
      <Link to={`/reservations/${reservation.reservation_id}/seat`}>
        <button type="button" className="btn btn-secondary mr-2">
          Seat
        </button>
      </Link> : null}
    </td>
  </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Reservation ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsList}
        </tbody>
      </table>
    </>
  );
}

export default ReservationsView;