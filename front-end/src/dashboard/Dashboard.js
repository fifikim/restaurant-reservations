import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import {
  listReservations,
  listTables,
  finishRes,
  cancelStatus,
} from "../utils/api";
import NavButtons from "./NavButtons";
import ViewReservations from "./ViewReservations";
import ViewTables from "./ViewTables";

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
      <body class="container mt-4">
        <div class="row">
          <div class="col col-lg-5">
            <NavButtons date={date} />
          </div>
          <div class="col col-lg-7">
            <div className="d-md-flex mb-3">
              <ViewTables tables={tables} onFinish={onFinish} />
            </div>
          </div>
        </div>
      </body>

      <div className="d-md-flex mb-3">
        <ErrorAlert error={reservationsError} />
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
