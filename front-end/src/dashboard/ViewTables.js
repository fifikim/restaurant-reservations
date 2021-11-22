import React, {useEffect, useState} from "react";
import { listTables } from "../utils/api";

function ReservationsView({date}) {
  const [tables, setTables] = useState([]);

  useEffect(loadReservations, [date]);      
           
  function loadReservations() {                  
    const ac = new AbortController();
    listTables({}, ac.signal)
      .then(setTables)
    return () => ac.abort();
  }

  const tablesList = tables.map((table) => (
    <tr key={table.table_id}>
    <th scope="row">{table.table_id}</th>
    <td>{table.table_name}</td>
    <td>{table.capacity}</td>
    <td>{table.reservation_id ? `Occupied by Reservation #${table.reservation_id}` : `Free`}</td>
  </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Table ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tablesList}
        </tbody>
      </table>
    </>
  );
}

export default ReservationsView;