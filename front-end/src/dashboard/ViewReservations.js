import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../utils/api";

function ReservationsView({date}) {
  const [reservations, setReservations] = useState([]);

  useEffect(loadReservations, [date]);               

  function loadReservations() {                 
    const ac = new AbortController();
    listReservations({ date }, ac.signal)
      .then(setReservations)
    return () => ac.abort();
  }

  const reservationsList = reservations.map((res) => (
    <tr key={res.reservation_id}>
    <th scope="row">{res.reservation_id}</th>
    <td>{res.first_name}</td>
    <td>{res.last_name}</td>
    <td>{res.mobile_number}</td>
    <td>{res.reservation_time}</td>
    <td>{res.people}</td>
    <td>
      <Link to={`/reservations/${res.reservation_id}/seat`}>
        <button type="button" className="btn btn-secondary mr-2">
          Seat
        </button>
      </Link>
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