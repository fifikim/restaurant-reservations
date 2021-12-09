import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchRes } from "../utils/api";
import ViewReservations from "../dashboard/ViewReservations";

/**
 * renders Search Form component
 * displays list of reservations matching inputted mobile number
 *
 * @returns {JSX.Element}
 */
function SearchForm() {
  const [mobileNum, setMobileNum] = useState("");
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);

  // search box change handler: saves mobile number to state
  const handleChange = ({ target }) => {
    setMobileNum(target.value);
  };

  // search form submit handler
  async function submitHandler(event) {
    event.preventDefault();

    try {
      // fetch and save results (if any)
      // display results (or message if none)
      const data = await searchRes(mobileNum);
      setResults(data);
      setDisplay(true);
    } catch (error) {
      // display error alerts if api call fails
      setErrors([...errors, error]);
    }
  }

  // displays validation error message (if any) as alert components
  const errorsList = errors.length
    ? errors.map((error) => <ErrorAlert error={error} />)
    : null;

  // render list of matching reservations or message if none found
  const searchResults = (
    <div>
      {results.length ? (
        <ViewReservations reservations={results} />
      ) : (
        `No reservations found matching phone number ${mobileNum}.`
      )}
    </div>
  );

  return (
    <>
      <div className="row mt-2">
        <ul>{errorsList}</ul>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            value={mobileNum}
            onChange={handleChange}
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            required={true}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary mr-2">
            Find
          </button>
        </div>
      </form>

      <div>{display && searchResults}</div>
    </>
  );
}

export default SearchForm;
