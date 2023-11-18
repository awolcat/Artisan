import { useState, useEffect } from "react";
import Loading from '../Loading';

export default function Jobs(props) {
    const [openContracts, setOpenContracts] = useState(null);
    const {identity, setUser} = props;
    const [services, setServices] = useState(null);
    const rows = [];
    
    async function getOpenContracts() {
        //Get contracts marked as open
        try {
            const url = 'http://127.0.0.1:5000/api/v1/contracts'
            const response = await fetch(url);
            const data = await response.json();
            const open = [];
            await data.forEach((contract) => {
                if (contract.status === 'open') {
                    open.push(contract);
                }
            });
            setOpenContracts(open);
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {getOpenContracts();}, []);

    async function bookJob(contract) {
        try {
            //Create a booking in relation to selected contract. AKA claim a contract
            const contract_url = 'http://127.0.0.1:5000/api/v1/contracts/' + contract.id;
            const bookingResponse = await fetch('http://127.0.0.1:5000/api/v1/bookings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                'user_id': contract.user_id,
                'contractor_id': identity.id,
                'contract_id': contract.id,
                'service_id': contract.service_id,
                'status': 'confirmed',
                'booking_date': contract.start_date,
                }),             
            });
            if (bookingResponse.ok) {
                //Booked contract status changes from open to confirmed so that it is now unavailable at /jobs
                await fetch(contract_url, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'status': 'confirmed'})
                });
            }
        }
        catch (error) {
            alert(`There was an error:\n${error}`);
        }
        
    }

    async function getIdentity() {
        // Get user identity
        try {
            const idUrl = 'http://127.0.0.1:5000/current_contractor';
            const response = await fetch(idUrl, {
                    headers: {'Authorization': localStorage.getItem('token'),},
                });
            const result = await response.json();
            setUser({token: localStorage.getItem('token'), obj: result});
        }     
        catch (error) {
            alert(error);
        }
    }

    async function handleClick(contract) {
        //Handle "claim" action
        alert(`You are about to claim a contract that starts ${contract.start_date}`);
        await bookJob(contract);
        alert('Success!');
        await getIdentity();
    }
    
    async function getServices() {
        try {
            const url = 'http://127.0.0.1:5000/api/v1/services/';
            const response = await fetch(url);
            const data = await response.json();
            setServices(data);
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {getServices()}, []);

    function getService(id) {
        for (const service of services.services) {
            if (service.id === id) {
                return (service)
            }
        }
    }


    if (openContracts && services) {
        openContracts.forEach((contract) => {
            const service = getService(contract.service_id)
            rows.push(
                <div className="job" key={contract.id}>
                    <div className="job-img">
                        <img alt="job description" src="https://placehold.co/600x400/png" />
                    </div>
                    <div className="job-details">
                        <div className='heading'>
                            <h3>{service.name}</h3>
                            <p>{contract.start_date.split('T')[0]}</p>
                        </div>
                        <p className='description'>{contract.description}</p>
                        <div className="budget-book">
                            <p className='budget'>{contract.budget}</p>
                            {identity && identity.services ? <button onClick={() => {handleClick(contract)}}>Claim</button> : ''}
                        </div>
                    </div>
                </div>
            )
        })
    } else {
        rows.push(<Loading />)
    }

    return (
        <div className="jobs">
            {rows}
        </div>
    );
}
