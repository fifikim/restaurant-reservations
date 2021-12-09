import React from "react";
import { createTable } from "../utils/api";
import TablesForm from "./TablesForm";

/**
 * renders page view for New Table route
 *
 * @returns {JSX.Element}
 */
function TablesNew() {
  // form submit onSuccess handler: creates new table via api post call
  function newTable(table) {
    createTable(table);
  }

  return (
    <div>
      <h2>Create Table</h2>

      <TablesForm onSuccess={newTable} />
    </div>
  );
}

export default TablesNew;
