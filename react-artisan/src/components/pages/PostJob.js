import { useState } from "react";
export default function PostJob(props) {
    //Post a contract that will be available to any contractor on first come first served basis
    const {services, identity} = props;
    const [ formData, setFormData] = useState({
        service_name: '',
        user_id: identity.id,
        description: '',
        budget: 0.00,
        status: 'pending',
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
            //Contract with status open indicates it is available to be claimed
            const response = await fetch('http://127.0.0.1:5000/api/v1/contracts', {
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
        await submitContract();
        //await getIdentity();
        alert('Your Job Posting Has Been Published!')
        setFormData({
            service_name: '',
            user_id: identity.id,
            description: '',
            budget: 0.00,
            status: 'pending',
            end_date: '',
            start_date: '',
            });
    }

    return (
        <div>
            <h2>Post a Job and Let Contractors find you</h2>
            <p>{formData.service_name}</p>
            <form onSubmit={handleSubmit}>
                <select id="service_name" name="service_name" value={formData.service_name} onChange={handleChange}>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Appliances Repair">Appliances Repair</option>
                    <option value="Painting">Painting</option>
                    <option value='Plumbing'>Plumbing</option>
                    <option value='Landscaping'>Landscaping</option>
                </select>
                <label htmlFor='description'>Description </label>
                <input type='text' name='description' value={formData.description} onChange={handleChange}/>
                <label htmlFor="start_date">Start Date </label>
                <input type='datetime-local' name='start_date' value={formData.start_date} onChange={handleChange} required />
                <label htmlFor='budget'>Budget </label>
                <input type='number' name='budget' value={formData.budget} onChange={handleChange} required/>
                <input type='submit' value='Send Offer' />
        </form>
        </div>
    )
}