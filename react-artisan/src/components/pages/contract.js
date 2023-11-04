import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Contract() {
    const { serviceId } = useParams();
    const [ service, setService] = useState(null);
    const users = [1, 2, 3]; //Replace with real user_id in state
    const [ formData, setFormData] = useState({
                                        service_id: serviceId,
                                        status: 'open',
                                        user_id: users[Math.floor(Math.random() * 2)],
                                        description: '',
                                        end_date: '',
                                        start_date: '',
                                        budget: 0.00,
                                        });
    //Function run after render to get data about the current service: User
    async function getService(serviceId) {
        const response = await fetch('http://localhost:5000/api/v1/service_offers/' + serviceId);
        const data = await response.json();
        setService(data);
    }

    //handle change in form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        async function submitContract() {
            const response = await fetch('http://127.0.0.1:5000/api/v1/contracts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const contractData = await response.json()
            if (response.status === 200) {
                console.log('contract sent');
                //In the background, create a booking that the contractor will be able to accept or reject
                const bookingResponse = await fetch('http://127.0.0.1:5000/api/v1/bookings', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'user_id': contractData.user_id,
                        'contract_id': contractData.contract_id,
                        'contractor_id': service.contractor_id,
                        'service_offer_id': service.id,
                        'status': 'pending',
                        'booking_date': Date(),
                        }),             
                    });
                if (bookingResponse.status === 200) {
                    alert(`A request for: ${service.name} was sent ${formData.description}`);
                } else {
                    alert('error');
                }
            }
        }

        submitContract();
    }

    useEffect(() => { getService(serviceId);}, [serviceId]); //Get service_offer data
    const details = [];

    if (service) {
        details.push( <>
                    <h2>Book {service.name}</h2>
                    <h3>Description</h3>
                    <p>{service.description}</p>
                </>
                );
    } else {
        details.push(<p>Loading...</p>);
    }
    //const users = [1, 2, 3];
    if (service && service.status === 'available') {
        details.push(
            <form onSubmit={handleSubmit}>
                
                <label htmlFor='description'>Description </label>
                <input type='text' name='description' value={formData.description} onChange={handleChange}/>
                <label htmlFor="start_date">Start Date </label>
                <input type='datetime-local' name='start_date' value={formData.start_date} onChange={handleChange} required />
                <label htmlFor='end_date'>End Date </label>
                <input type='datetime-local' name='end_date' value={formData.end_date} onChange={handleChange} required />
                <label htmlFor='budget'>Budget </label>
                <input type='number' name='budget' value={formData.budget} onChange={handleChange} required/>
                <input type='submit' value='Send Offer' />
            </form>
        );
    } else if (service && service.status === 'unavailable') {
        details.push(<p>This service is not currently available</p>);
    }

    return (
        <div className='contract-form'>
            { details }
        </div>
    );
}