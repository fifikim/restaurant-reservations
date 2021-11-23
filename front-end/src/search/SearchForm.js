import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';
import { searchRes } from '../utils/api';
import ViewReservations from '../dashboard/ViewReservations';

function SearchForm() {
  const [mobileNum, setMobileNum] = useState('');
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);

  // set Table state to selected table
  const handleChange = ({target}) => {  
    setMobileNum(target.value);
  };

  // seat request submit handler
  async function submitHandler(event) {    
    event.preventDefault();

    try {
      // send searchRes api call 
      const data = await searchRes(mobileNum);
      setResults(data);
      setDisplay(true);
    } catch(error) {
      // display error alerts if api call fails
      setErrors([...errors, error]);
    };
  };

  // displays validation error message as alert components
  const errorsList = errors.map((error) => (
    <ErrorAlert error={error} />
  ));

  // render list of reservations or message if none found
  const searchResults = (
    <div>
     {results.length ? <ViewReservations reservations={results} /> : `No reservations found matching phone number ${mobileNum}.`}
    </div>
  );        

  return (
    <>
      <div className="row mt-2">
        <ul>
        {errors && errorsList}
        </ul>
      </div>

      <form onSubmit={submitHandler}>

      <div className="mb-3">
          <label htmlFor="mobile_number">
            Mobile Number: 
          </label>
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

      <div>
        {display && searchResults}
      </div>
    </>
  )
}

export default SearchForm;