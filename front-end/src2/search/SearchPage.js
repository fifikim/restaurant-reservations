import React from "react";
import { useHistory } from "react-router-dom";
import { seatRes } from "../utils/api";
import SearchForm from "./SearchForm";

/**
 * renders page view for Search Page route
 *
 * @returns {JSX.Element}
 */
function SearchPage() {
  const history = useHistory();

  // cancel button handler: redirect to Dashboard for current date
  function cancel() {
    history.push(`/dashboard`);
  }

  return (
    <>
      <h2>Search Reservations </h2>

      <SearchForm onSuccess={seatRes} onCancel={cancel} />
    </>
  );
}

export default SearchPage;
