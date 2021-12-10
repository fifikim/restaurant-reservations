import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * A basic form layout for a reservation
 * @returns {JSX.Element}
 *  a form prefilled with info or not
 */
export default function ReservationsForm({ formData, setFormData, error, submitHandler}) {
    const history = useHistory();

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

    return (
        <main>
            <h1>Create a new reservation</h1>
            <ErrorAlert error={error} />
            <div className="d-md-flex mb-3">
                <div className=''>
                    <form onSubmit={submitHandler}>
                        <label className='form-label mt-2'>First name:</label>
                        <input
                            id='first_name' 
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={changeHandler}
                            className='form-control'
                        /> 
                        <label className='form-label mt-2'>Last name:</label>
                        <input
                            id='last_name' 
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Mobile number: </label>
                        <input
                            type='tel' 
                            name="mobile_number"
                            placeholder='000-000-0000'
                            minLength='7'
                            maxLength='12'
                            required
                            value={formData.mobile_number}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Reservation date: </label>
                        <input 
                            type='date'
                            name="reservation_date"
                            required
                            value={formData.reservation_date} 
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Reservation time:</label>
                        <input 
                            type='time'
                            name="reservation_time"
                            required
                            value={formData.reservation_time}
                            onChange={changeHandler}
                            className='form-control'
                        />
                        <label className='form-label mt-2'>Amount of people:</label>
                        <input 
                            id='people'
                            name="people"
                            type='number'
                            value={formData.people}
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