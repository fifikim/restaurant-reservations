import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * 
 * @returns renders preview of each deck on Home page 
 */
function ReservationsView(reservations) {
  console.log(reservations);

  const reservationsList = reservations.map((reservation) => (    // maps each deck in decks to jsx render
    <div
      key={reservation.reservation_id}
      className="col-12 col-md-6 my-2 align-self-stretch"
    >
      <article className="border rounded p-4 h-100">
        <div>
          <p>{reservation.first_name}</p>
          <p>{reservation.last_name} </p>
        </div>
        <button
          className="btn btn-danger float-right"
          title="Seat"
        >
          Seat
        </button>
      </article>
    </div>
  ));

  return (
    <>
      <div className="row mt-2 deck-list">{reservationsList}</div>
    </>
  );
}

export default ReservationsView;