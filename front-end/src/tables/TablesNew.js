import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from '../layout/ErrorAlert';

export default function NewTable() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const initalFormData = {
        table_name: '',
        capacity: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });

    // form input change handler
    const changeHandler = ({ target: { name, value } }) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    // cancel redirects to previous page
    const cancelHandler = () => {
        history.goBack();
    }

    // submit sends api call & redirects to dashboard 
    const submitHandler = async (event) => {
        event.preventDefault();
        const ac = new AbortController();
        try {
            formData.capacity = Number(formData.capacity);
            await createTable(formData, ac.signal);
            history.push(`/`);
        } catch (error) {
            setError(error);
        }
    }
    
    return (
        <main>
            <h1>Create a new table</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3">
                <div className=''>
                    <form onSubmit={submitHandler}>
                        <label className='form-label mt-2'>Table name:</label>
                        <input
                            name="table_name"
                            required
                            minLength={2}
                            value={formData.table_name}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Capacity:</label>
                        <input 
                            type='number'
                            name="capacity"
                            required
                            value={formData.capacity}
                            onChange={changeHandler} 
                            className='form-control'
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >Submit</button>
                        <button
                            type="button"
                            className="btn btn-secondary mt-4 ml-2"
                            onClick={cancelHandler}
                        >Cancel</button>
                    </form>
                </div>
            </div>  
        </main>
    );
}
