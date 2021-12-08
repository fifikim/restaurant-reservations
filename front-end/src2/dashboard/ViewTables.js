// import React from "react";

// /**
//  * Renders a table containing all restaurant tables
//  * 
//  * @returns {JSX.Element}
//  */
// function TablesView({ tables = [], onFinish }) {

//   // finish button click handler: displays confirmation alert window
//   const finish = ({ target }) => {
//     const tableId = target.dataset.tableIdFinish;
//     const finishConfirm = window.confirm(
//       "Is this table ready to seat new guests? This cannot be undone."
//     );
//     if (finishConfirm) {
//       onFinish(tableId);
//     }
//   };

//   // maps tables passed from parent component to table rows
//   // displays occupancy status of 'Free' or 'Occupied'
//   // displays reservation ID & 'Finish' button if table is occupied
//   const tablesList = tables.map((table) => (
//     <tr key={table.table_id}>
//       <th scope="row">{table.table_name}</th>
//       <td>{table.capacity}</td>
//       <td data-table-id-status={table.table_id}>
//         {table.reservation_id
//           ? `Occupied by Reservation #${table.reservation_id}`
//           : `Free`}
//       </td>
//       <td>
//         {table.reservation_id ? (
//           <button
//             type="button"
//             onClick={finish}
//             data-table-id-finish={table.table_id}
//             className="btn btn-secondary mr-2"
//           >
//             Finish
//           </button>
//         ) : null}
//       </td>
//     </tr>
//   ));

//   return (
//     <div>
//       <table className="table table-dark table-striped table-sm">
//         <thead className="thead-dark">
//           <tr>
//             <th scope="col">Table</th>
//             <th scope="col">Capacity</th>
//             <th scope="col">Status</th>
//           </tr>
//         </thead>
//         <tbody>{tablesList}</tbody>
//       </table>
//     </div>
//   );
// }

// export default TablesView;

import React from "react";

function TablesView({tables = [], onFinish}) {

  const finish = ({target}) => {
    const tableId = target.dataset.tableIdFinish;
    const finishConfirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (finishConfirm) {
      onFinish(tableId);
    }
  };

  const tablesList = tables.map((table) => (
    <tr key={table.table_id}>
    <th scope="row">{table.table_id}</th>
    <td>{table.table_name}</td>
    <td>{table.capacity}</td>
    <td data-table-id-status={table.table_id}>{table.reservation_id ? `Occupied by Reservation #${table.reservation_id}` : `Free`}</td>
    <td>{table.reservation_id ? 
      <button type="button" onClick={finish} data-table-id-finish={table.table_id} className="btn btn-secondary mr-2">
        Finish 
      </button> : null}</td>
  </tr>
  ));

  return (
    <div>
      <table className="table table-dark table-striped table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Table ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tablesList}
        </tbody>
      </table>
    </div>
  );
}

export default TablesView;