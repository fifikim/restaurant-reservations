import React, { useEffect, useState } from "react";
import ViewReservations from "./ViewReservations";
import ViewTables from "./ViewTables";
import {
  listReservations,
  listTables,
  finishRes,
  cancelStatus,
} from "../utils/api";
import NavButtons from "./NavButtons";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * renders Dashboard page
 * displays Tables with occupancy status & Reservations for selected date
 *
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  // reload dashboard when date is updated
  useEffect(loadDashboard, [date]);

  // clear any previous errors
  // fetch and save reservations for selected date
  // fetch and save tables
  // save any errors
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables);
    return () => abortController.abort();
  }

  // finish button click handler
  function onFinish(tableId) {
    finishRes(tableId).then(loadDashboard).catch(setReservationsError);
  }

  // cancel button click handler
  function onCancelRes(reservationId) {
    cancelStatus(reservationId).then(loadDashboard).catch(setReservationsError);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <NavButtons date={date} />

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date} </h4>
        <ErrorAlert error={reservationsError} />
      </div>

      <div className="d-md-flex mb-3">
        <ViewTables tables={tables} onFinish={onFinish} />
      </div>
      <div className="d-md-flex mb-3">
        <ViewReservations
          reservations={reservations}
          onCancelRes={onCancelRes}
        />
      </div>
    </main>
  );
}

export default Dashboard;
