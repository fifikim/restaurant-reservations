import React from "react";
import { Link } from "react-router-dom";

/**
 * Renders a table containing reservations for selected date,
 * excluding reservations with cancelled/finished status
 *
 * @returns {JSX.Element}
 */
function ReservationsView({ reservations = [], onCancelRes }) {
  // cancel button click handler: displays confirmation alert window
  function cancelRes({ target }) {
    const reservationId = target.dataset.reservationIdCancel;
    console.log(reservationId);
    const cancelConfirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (cancelConfirm) {
      onCancelRes(reservationId);
    }
  }

  // maps reservations passed from parent component to table rows
  // displays 'Seat', 'Edit', 'Cancel' buttons
  // hides button selections not allowed under reservation current status
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
      <td>
        {reservation.status === "booked" ? (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button type="button" className="btn btn-primary mr-2">
              Seat
            </button>
          </Link>
        ) : null}
        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
          <button type="button" className="btn btn-secondary mr-2">
            Edit
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={cancelRes}
          data-reservation-id-cancel={reservation.reservation_id}
        >
          Cancel
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
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
        <tbody>{reservationsList}</tbody>
      </table>
    </div>
  );
}

export default ReservationsView;
