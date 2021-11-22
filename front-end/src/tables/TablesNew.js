import React from 'react';
import { createTable } from '../utils/api';
import TablesForm from './TablesForm';

/**
 * 
 * @returns renders page view for New Reservation route
 */
function TablesNew() {

  function newTable(table) {    // onSuccess handler: creates res via api
    createTable(table) // post call & redirects to res date dashboard
  }

  return (
    <>
    <h2>Create Table</h2>

    <TablesForm 
      onSuccess={newTable}
    />
  </>
  )
}

export default TablesNew;