import React from "react";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";

/**
 * renders page view for New Table route
 *
 * @returns {JSX.Element}
 */
function NewTable() {
  // form submit onSuccess handler: creates new table via api post call
  function newTable(table) {
    createTable(table);
  }

  return (
    <>
      <h2>Create Table</h2>

      <TableForm onSuccess={newTable} />
    </>
  );
}

export default NewTable;
