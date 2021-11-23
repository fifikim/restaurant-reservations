import React from "react";
import { useHistory } from 'react-router-dom';
import { today, previous, next } from "../utils/date-time";

export default function NavButtons({date}) {
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
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={goPreviousDay}>Previous Day</button>
      <button type="button" className="btn btn-secondary" onClick={goNextDay}>Next Day</button>
      <button type="button" className="btn btn-primary" onClick={goToday}>Today</button>
    </div>
  );
}

