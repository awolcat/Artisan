import { useState } from "react";
export default function PostJob(props) {
    //Post a contract that will be available to any contractor on first come first served basis
    const {services, identity, handleClick} = props;
    const [ formData, setFormData] = useState({
        service_name: '',
        user_id: identity.id,
        description: '',
        budget: 0.00,
        status: '',
        end_date: '',
        start_date: '',
        });


    //Get service id based on service name. Service names are controlled
    function getServiceId(name) {
        for (const service of services.services) {
            if (service.name === name) {
                return (service.id)
            }
        }
    }

    //handle change in form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    //Submit form data
    const handleSubmit = async (event) => {
        event.preventDefault();
        const service_id = await getServiceId(formData.service_name);
        async function submitContract() {
            try {
            //Contract with status open indicates it is available to be claimed
            const response = await fetch('https://' + window.location.hostname + '/api/v1/contracts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        'service_id': service_id,
                        'user_id': identity.id,
                        'description': formData.description,
                        'budget': formData.budget,
                        'status': 'open',
                        'end_date': '',
                        'start_date': formData.start_date,
                    }),
                });
            }
            catch (error) {
                alert(error);
            }
            
        }
        await submitContract();
        //await getIdentity();
        alert('Your Job Posting Has Been Published!')
        setFormData({
            service_name: '',
            user_id: identity.id,
            description: '',
            budget: 0.00,
            status: '',
            end_date: '',
            start_date: '',
            });
    }

    return (
        <div className="post-job-form-inner">
            <div className='post-job-header'>
                <h2>Post a Job, Let Contractors find You</h2>
                <button onClick={() => {handleClick('not-an-id')}}>&#128473;</button>
            </div>
            <form onSubmit={handleSubmit}>
            <label htmlFor='service_name'>Select a service that best describes your project </label>
                <select id="service_name" name="service_name" value={formData.service_name} onChange={handleChange} required>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Appliances Repair">Appliances Repair</option>
                    <option value="Painting">Painting</option>
                    <option value='Plumbing'>Plumbing</option>
                    <option value='Landscaping'>Landscaping</option>
                </select>
                <label htmlFor='description'>Write a brief description of the project </label>
                <textarea name='description' rows="10" cols="10" wrap="hard" value={formData.description} onChange={handleChange} required></textarea>
                <label htmlFor="start_date">When would you like work to begin </label>
                <input type='datetime-local' name='start_date' value={formData.start_date} onChange={handleChange} required />
                <label htmlFor='budget'>What is your budget for the contractor? </label>
                <input type='number' name='budget' value={formData.budget} onChange={handleChange} required/>
                <input type='submit' value='Send Offer' />
        </form>
        </div>
    )
}
