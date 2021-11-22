import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { listTables, unseatRes } from "../utils/api";

function TablesView({date}) {
  const [tables, setTables] = useState([]);

  useEffect(loadTables, [date]);      
           
  function loadTables() {                  
    const ac = new AbortController();
    listTables({}, ac.signal)
      .then(setTables)
    return () => ac.abort();
  }

  const finish = () => {
    const finishConfirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (finishConfirm) {
      console.log('finish Table');
      unseatRes().then(loadTables);
    }
  };

  const finishButton = (
    <button type="button" onClick={finish} className="btn btn-secondary mr-2">
      Finish
    </button>
  );

  const tablesList = tables.map((table) => (
    <tr key={table.table_id}>
    <th scope="row">{table.table_id}</th>
    <td>{table.table_name}</td>
    <td>{table.capacity}</td>
    <td>{table.reservation_id ? `Occupied by Reservation #${table.reservation_id}` : `Free`}</td>
    <td>{table.reservation_id ? finishButton : null}</td>
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

export default TablesView;