import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

/**
 * renders Seat Form component
 * seats single reservation at selected table
 * 
 * @returns {JSX.Element}
 */
function SeatForm({ reservation_id, onSuccess, onCancel }) {
  const [freeTables, setFreeTables] = useState([]);
  const [errors, setErrors] = useState([]);
  const [tableId, setTableId] = useState(null);
  const history = useHistory();

  // load available tables & save them to state
  useEffect(loadTables, []);

  // load tables
  function loadTables() {
    const ac = new AbortController();
    const filterTables = (tables) =>
      tables.filter((table) => table.reservation_id == null);
    listTables(ac.signal).then(filterTables).then(setFreeTables);
    return () => ac.abort();
  }

  // set Table state to selected table
  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  // seat request submit handler
  async function submitHandler(event) {
    event.preventDefault();

    try {
      // send seatRes api call
      // update tableId with reservationId
      // update reservationId with 'seated' status
      await onSuccess(tableId, reservation_id);
      history.push("/dashboard");
    } catch (error) {
      // display error alerts if api call fails
      setErrors([...errors, error]);
    }
  }

  // populates dropdown menu options with list of available tables
  const listFreeTables = freeTables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  // displays validation error message as alert components
  const errorsList = errors.map((error) => (
    <ErrorAlert error={error.message} />
  ));

  return (
    <>
      <div className="row mt-2">
        <ul>{errors && errorsList}</ul>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="Table Options">
            Select Table:
            <select id="table_id" name="table_id" onChange={handleChange}>
              <option value="">-- Select an Option --</option>
              {listFreeTables}
            </select>
          </label>
        </div>

        <div className="mb-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default SeatForm;
