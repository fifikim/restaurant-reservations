import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TablesView = (tables) => {
  const tablesList = tables.map((table) => (    // maps each deck in decks to jsx render
    <div
      key={table.table_id}
      className="col-12 col-md-6 my-2 align-self-stretch"
    >
      <article className="border rounded p-4 h-100">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{table.name}</h5>
          <small>Capacity: {table.capacity} </small>
        </div>
        <button
          className="btn btn-danger float-right"
          title="Delete deck"
        >
          Seat
        </button>
      </article>
    </div>
  ));

  return (
    <>
      <div className="row mt-2 deck-list">{tablesList}</div>
    </>
  );
}

export default TablesView;