import React, { useState } from "react";
import { useHistory } from "react-router";
import { createRes } from "../utils/api";
import ReservationsForm from "./ReservationsForm";

export default function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const initalFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState({ ...initalFormData });

  // on submit send api post call & redirect to dashboard for reservation date
  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    try {
      formData.people = Number(formData.people);
      await createRes(formData, ac.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Create New Reservation</h1>
      <ReservationsForm
        formData={formData}
        setFormData={setFormData}
        error={error}
        submitHandler={submitHandler}
      />
    </div>
  );
}
