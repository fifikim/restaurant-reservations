import React, { useEffect, useState} from "react";
import ViewReservations from "./ViewReservations";
import ViewTables from "./ViewTables";
import { listReservations, listTables, finishRes, cancelStatus } from "../utils/api";
import NavButtons from "./NavButtons";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables);
    return () => abortController.abort();
  }

  function onFinish(tableId) {
    finishRes(tableId)
      .then(loadDashboard)
      .catch(setReservationsError);
  }

  function onCancelRes(reservationId) {
    cancelStatus(reservationId)
      .then(loadDashboard)
      .catch(setReservationsError);
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
        <ViewReservations reservations={reservations} onCancelRes={onCancelRes} />
      </div>
    </main>
  );
}

export default Dashboard;

