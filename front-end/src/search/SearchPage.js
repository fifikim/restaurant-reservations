import React from "react";
import { useHistory } from "react-router-dom";
import { seatRes } from "../utils/api";
import SearchForm from "./SearchForm";

/**
 *
 * @returns renders page view for New Reservation route
 */
function SearchPage() {
  const history = useHistory();

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
