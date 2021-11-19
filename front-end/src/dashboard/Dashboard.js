import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import ReservationsView from "./ViewReservations";
import TablesView from "./ViewTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);
  // useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    // listTables().then(setTables);
    return () => abortController.abort();
  }

  // function loadTables() {
  //   const tables = listTables();
  //   console.log({tables});
  // }

  function goPreviousDay() {
    history.push(`/dashboard?date=${previous(date)}`)
  }

  function goToday() {
    history.push(`/dashboard?date=${today()}`)
  }

  function goNextDay() {
    history.push(`/dashboard?date=${next(date)}`)
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary" onClick={goPreviousDay}>Previous Day</button>
        <button type="button" className="btn btn-secondary" onClick={goToday}>Today</button>
        <button type="button" className="btn btn-secondary" onClick={goNextDay}>Next Day</button>
      </div>

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date:  {date} </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      {/* <ReservationsView reservations={JSON.stringify(reservations)} /> */}
      {/* <TablesView tables={tables} /> */}
    </main>
  );
}

export default Dashboard;
