import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 *
 * @param {object} props passed from parent route
 *
 * @returns TablesForm component for New Table route
 */
function TablesForm({
  onSuccess, // form onSubmit handler
  initialState, // saved Reservation state (or blank)
}) {
  const [formData, setFormData] = useState({ ...initialState });
  const history = useHistory();

  const handleInputChange = ({ target }) => {
    setFormData({
      // saves form input in formData
      ...formData, // state object as value of key
      [target.name]: target.value, // matching input field name
    });
  };

  async function submitHandler(event) {
    event.preventDefault(); // calls onSuccess function to Create Table
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
