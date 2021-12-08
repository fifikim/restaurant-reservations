// import React from "react";
// import { useHistory } from "react-router-dom";
// import { today, previous, next } from "../utils/date-time";

// /**
//  * Renders the navigation buttons & heading for Dashboard page.
//  * 
//  * @returns {JSX.Element}
//  */
// export default function NavButtons({ date }) {
//   const history = useHistory();

//   function goPreviousDay() {
//     history.push(`/dashboard?date=${previous(date)}`);
//   }

//   function goToday() {
//     history.push(`/dashboard?date=${today()}`);
//   }

//   function goToDate() {
//     history.push(`/dashboard?date=${today()}`);
//   }

//   function goNextDay() {
//     history.push(`/dashboard?date=${next(date)}`);
//   }

//   const d = date.split('/');
//   const year = d[0];
//   const month = d[1];
//   const day = d[2];

//   const dateString = new Date(`${month}-${day}-${year}`).toDateString();


//   return (
//     <>
//       <row className="mt-6">
//       <div className="btn-group" role="group" aria-label="Jump to Date">
//           <button type="button" className="btn btn-success" onClick={goToday}>
//             Jump to Today
//           </button>
//           <button type="button" className="btn btn-warning" onClick={goToday}>
//             Jump to Date
//           </button>
//         </div>
//         <h2 className="mt-3 mb-0">Reservations for:</h2>
//         <h1>{`${dateString}`} </h1>
//         <div className="btn-group" role="group" aria-label="Go Back or Forward">
//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={goPreviousDay}
//           >{`<<Previous Day`}</button>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={goNextDay}
//           >{`Next Day>>`}</button>
//         </div>
//       </row>
//     </>
//   );
// }

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

