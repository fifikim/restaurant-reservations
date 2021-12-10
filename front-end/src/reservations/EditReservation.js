import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readRes, updateRes } from "../utils/api";
import ReservationsForm from "./ReservationsForm";

/**
 * A form for editing a current reservation
 * @returns {JSX.Element}
 *  a updated reservation in the list
 */
export default function EditReservation() {
    const history = useHistory();
    const { reservation_id } = useParams();
    const [error, setError] = useState(null);
    const initalFormData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });
    
    // load existing reservation info into form
    useEffect(() => {
    const getReservation = async () => {
        const ac = new AbortController();
        try {
        const reservation = await readRes(reservation_id, ac.signal);
        const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = reservation;
        setFormData({
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
        })
        } catch (error) {
        setError(error);
        }
    }
    getReservation();
    }, [reservation_id])
   
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            formData.people = Number(formData.people);
            await updateRes(reservation_id, formData, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
        } catch (error) {
            setError(error);
        }
    }
    
    return (
        <ReservationsForm formData={formData} setFormData={setFormData} error={error} submitHandler={submitHandler} />
    );
}