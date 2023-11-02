import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Contract() {
    const { serviceId } = useParams();
    const [ service, setService] = useState(null);

    async function getService(serviceId) {
        const response = await fetch('http://localhost:5000/api/v1/service_offers/' + serviceId);
        const data = await response.json();
        setService(data);
    }

    useEffect(() => { getService(serviceId);}, [serviceId])
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
    const users = [1, 2, 3]
    if (service && service.status === 'available') {
        details.push(
            <form action='http://127.0.0.1:5000/api/v1/contracts' method='POST' enctype="application/json">
                <input type='number' name='service_id' value={ serviceId } readOnly hidden/>
                <input type='text' name='status' value='open' readOnly hidden/>
                <input type='number' name='user_id' value= {users[Math.floor(Math.random() * 2)]} />
                <label htmlFor='description'>Description </label>
                <input type='text' name='description' />
                <label htmlFor="start_date">Start Date </label>
                <input type='datetime-local' name='start_date' required />
                <label htmlFor='end_date'>End Date </label>
                <input type='datetime-local' name='end_date' required />
                <label htmlFor='budget'>Budget </label>
                <input type='number' name='budget' />
                <input type='submit' value='Send Offer' />
            </form>
        );
    } else if (service && service.status === 'unavailable') {
        details.push(<p>The contractor is not currently offering this service</p>);
    }

    return (
        <div className='contract-form'>
            { details }
        </div>
    );
}