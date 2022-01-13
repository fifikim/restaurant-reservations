import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Renders the navigation buttons & heading for Dashboard page.
 * 
 * @returns {JSX.Element}
 */
export default function NavButtons({ date }) {
  const history = useHistory();

  function goPreviousDay() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function goToday() {
    history.push(`/dashboard?date=${today()}`);
  }

  // TO-DO: add datepicker to display on button click
  function goToDate() { 
    history.push(`/dashboard?date=${today()}`);
  }

  function goNextDay() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  const d = date.split('/');
  const year = d[0];
  const month = d[1];
  const day = d[2];

  const dateString = new Date(`${month}-${day}-${year}`).toDateString();


  return (
    <>
      <div className="mt-6">
      <div className="btn-group" role="group" aria-label="Jump to Date">
          <button type="button" className="btn btn-success pl-4" onClick={goToday}>
            Jump to Today
          </button>
          <button type="button" className="btn btn-warning" onClick={goToDate} disabled={true}> 
            <span className="oi oi-calendar" alt="calendar"></span> Jump to Date 
          </button>
        </div>
        <h2 className="mt-3 mb-0">Reservations for:</h2>
        <h1>{`${dateString}`} </h1>
        <div className="btn-group mt-2" role="group" aria-label="Go Back or Forward">
          <button
            type="button"
            className="btn btn-danger px-4"
            onClick={goPreviousDay}
          ><span className="oi oi-chevron-left"></span> Previous Day</button>
          <button
            type="button"
            className="btn btn-primary px-4"
            onClick={goNextDay}
          >  Next Day <span className="oi oi-chevron-right"></span></button>
        </div>
      </div>
    </>
  );
}
