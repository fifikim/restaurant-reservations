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

  function goNextDay() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <>
      <row className="mt-6">
        <div>
          <button type="button" className="btn btn-success" onClick={goToday}>
            Jump to Today
          </button>
        </div>
        <h2 className="mt-3 mb-0">Reservations for:</h2>
        <h1>{date} </h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-warning"
            onClick={goPreviousDay}
          >{`<<Previous Day`}</button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={goNextDay}
          >{`Next Day>>`}</button>
        </div>
      </row>
    </>
  );
}
