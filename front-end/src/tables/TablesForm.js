import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 * Tables Form component for New Table route
 * creates new table
 *
 * @param onSuccess {function} form onSubmit handler
 * @param initialState {object} saved Reservation state (or blank)
 *
 * @returns {JSX.Element}
 */
function TablesForm({ onSuccess, initialState }) {
  const [formData, setFormData] = useState({ ...initialState });
  const history = useHistory();

  // form input change handler: saves input to formData state
  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // form submit handler
  // creates new table via api & redirects to Dashboard for current date
  async function submitHandler(event) {
    event.preventDefault();
    await onSuccess({ ...formData });
    history.push(`/dashboard`);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="table_name">Table name:</label>
          <input
            value={formData.table_name}
            onChange={handleInputChange}
            name="table_name"
            id="table_name"
            minLength={2}
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="capacity">Capacity:</label>
          <input
            value={formData.capacity}
            onChange={handleInputChange}
            name="capacity"
            id="capacity"
            type="number"
            min={1}
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <button
            type="button"
            onClick={history.goBack}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TablesForm;
