import { useState, useEffect } from "react";

export default function Jobs(props) {
    const [openContracts, setOpenContracts] = useState(null);
    const {identity, setUser} = props;
    const [services, setServices] = useState(null);
    
    async function getOpenContracts() {
        const url = 'http://127.0.0.1:80/api/v1/contracts'
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

    useEffect(() => {getOpenContracts();}, []);

    async function bookJob(contract) {
        const contract_url = 'http://127.0.0.1:80/api/v1/contracts/' + contract.id;
        //Create a booking in relation to selected contract. AKA claim a contract
        const bookingResponse = await fetch('http://127.0.0.1:80/api/v1/bookings', {
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

    // Get user identity
    // 'X-CSRF-TOKEN': csrfToken
    async function getIdentity() {
        const idUrl = 'http://127.0.0.1:80/current_contractor';
        
                const response = await fetch(idUrl, {
                    headers: {'Authorization': localStorage.getItem('token'),},
                });
                const result = await response.json();
                setUser({token: localStorage.getItem('token'), obj: result});
                //return (result)
                //console.log("CURRENT_USER", result);
         /*   }
            catch (error) {
                alert('Something went wrong while logging you in. Try again');
            }*/
    }

    async function handleClick(contract) {
        alert(`You are about to claim a contract that starts ${contract.start_date}`);
        await bookJob(contract);
        alert('Success!');
        await getIdentity();
    }
    
    async function getServices() {
        const url = 'http://127.0.0.1:80/api/v1/services/';
        const response = await fetch(url);
        const data = await response.json()
        setServices(data)
    }

    useEffect(() => {getServices()}, []);

    function getService(id) {
        for (const service of services.services) {
            if (service.id === id) {
                return (service)
            }
        }
    }

    const rows = [];

    if (openContracts && services) {
        openContracts.forEach((contract) => {
            const service = getService(contract.service_id)
            console.log("SERVICEID", contract.service_id)
            rows.push(
                <div className="job" key={contract.id}>
                    <div className="job-img">
                        <img alt="job description" src="https://placehold.co/600x400/png" />
                    </div>
                    <div className="job-details">
                        <p>{service.name}</p>
                        <p>{contract.description}</p>
                        <p>{contract.budget}</p>
                        <p>{contract.status}</p>
                        <p>{contract.service_id}</p>
                        {identity && identity.services ? <button onClick={() => {handleClick(contract)}}>Claim</button> : ''}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="jobs">
            {rows}
        </div>
    );
}
