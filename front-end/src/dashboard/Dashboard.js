import React from "react";
import { useHistory } from 'react-router-dom';
import { today, previous, next } from "../utils/date-time";
import ViewReservations from "./ViewReservations";
import ViewTables from "./ViewTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();

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

      <div className="d-md-flex mb-3">
        <ViewTables />
      </div>
      <div className="d-md-flex mb-3">
        <ViewReservations date={date} />
      </div>
    </main>
  );
}

export default Dashboard;

// import { listReservations, listTables } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";

  // const [reservations, setReservations] = useState([]);
  // const [reservationsError, setReservationsError] = useState(null);
  // useEffect(loadDashboard, [date]);
  // useEffect(loadTables, []);

  // function loadDashboard() {
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   return () => abortController.abort();
  // }

  // function loadTables() {
  // listTables().then(setTables);
  //   const tables = listTables();
  //   console.log({tables});
  // }

  // return 
  // <ErrorAlert error={reservationsError} />
  // {JSON.stringify(reservations)} */}