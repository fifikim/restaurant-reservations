import React, { useEffect, useState} from "react";
import ViewReservations from "./ViewReservations";
import ViewTables from "./ViewTables";
import { listReservations, listTables, finishRes } from "../utils/api";
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
    finishRes(tableId).then(loadDashboard);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <NavButtons date={date} />

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date:  {date} </h4>
        <ErrorAlert error={reservationsError} />
      </div>

      <div className="d-md-flex mb-3">
        <ViewTables tables={tables} onFinish={onFinish} />
      </div>
      <div className="d-md-flex mb-3">
        <ViewReservations reservations={reservations} />
      </div>
    </main>
  );
}

export default Dashboard;

