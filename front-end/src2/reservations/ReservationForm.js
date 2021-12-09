import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { validateForm } from "../utils/reservations-validation";

/**
 * renders Reservation Form component
 * creates new reservation or edits existing reservation
 *
 * @param onSuccess {function} form onSubmit handler
 * @param onCancel {function} form Cancel handler
 * @param initialState {object} saved Reservation state (or blank)
 *
 * @returns {JSX.Element}
 */
function ReservationForm({ onSuccess, onCancel, initialFormState }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState([]);

  // form input change handler: saves input to formData state
  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // form submit handler
  async function submitHandler(event) {
    event.preventDefault();
    console.log("submit");

    // check for validation errors
    const formErrors = validateForm(formData);
    if (formErrors.length) {
      setErrors(formErrors);
    }

    // if no errors, submit api post call & redirect to Dashboard
    else {
      console.log("onsuccess");
      await onSuccess({ ...formData });
    }
  }

  // displays validation error messages (if any) as alert components
  const errorsList = errors.map((error) => <ErrorAlert error={error} />);

  return (
    <div>
      <div className="row mt-2">
        <ul>{errorsList}</ul>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="first_name">First name:</label>
          <input
            value={formData.first_name}
            onChange={handleInputChange}
            name="first_name"
            id="first_name"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name">Last name:</label>
          <input
            value={formData.last_name}
            onChange={handleInputChange}
            name="last_name"
            id="last_name"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile_number">Mobile number:</label>
          <input
            value={formData.mobile_number}
            onChange={handleInputChange}
            name="mobile_number"
            id="mobile_number"
            type="tel"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reservation_date">Date of reservation:</label>
          <input
            value={formData.reservation_date}
            onChange={handleInputChange}
            name="reservation_date"
            id="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reservation_time">Time of reservation:</label>
          <input
            value={formData.reservation_time}
            onChange={handleInputChange}
            name="reservation_time"
            id="reservation_time"
            type="time"
            placeholder="HH:MM"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="people">Number of people in party:</label>
          <input
            value={formData.people}
            onChange={handleInputChange}
            name="people"
            id="people"
            type="number"
            min={1}
            required={true}
            className="form-control"
          />
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
    </div>
  );
}

export default ReservationForm;
