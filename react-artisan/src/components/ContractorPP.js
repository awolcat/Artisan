import { useState, useEffect } from 'react';

export default function ContractorPP(props) {
    const {identity, setUser} = props;
    const [contracts, setContracts] = useState(null);
    const [services, setServices] = useState(null);

    const bookings = [];
    const myServices = [];

    async function fetchServices() {
        const response = await fetch('http://127.0.0.1:5000/api/v1/services/');
        const data = await response.json();
        setServices(data);
    }

    useEffect(() => { fetchServices() }, []);

    function getService(id) {
        for (const service of services.services) {
            if (service.id === id) {
                return (service)
            }
        }
    }

    async function fetchContracts() {
        const response = await fetch('http://127.0.0.1:5000/api/v1/contracts/');
        const data = await response.json();
        setContracts(data);
    }

    useEffect(() => { fetchContracts() }, []);

    function getContract(id) {
        for (const contract of contracts) {
            if (contract.id === id) {
                return (contract)
            }
        }
    }

    // Get user identity
    // 'X-CSRF-TOKEN': csrfToken
    async function getIdentity() {
        const idUrl = 'http://127.0.0.1:5000/current_user';
        
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
    
    async function handleResponse(response, id) {
        let obj = {'status': ''};
        if (response === 'accept') {
            obj.status = 'accepted';
        } else {
            obj.status = 'rejected';  
        }
        try {
            const url = 'http://127.0.0.1:5000/bookings/' + id;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(obj),
            });
            await getIdentity();
            if (!response.ok) {
                alert('Something went wrong. Try again later');
            }
        }
        catch (error) {
            alert('Something went wrong. Try again later.')
        }
    }

    if (contracts && services) {
        identity.bookings.forEach((booking) => {
            const contract = booking?.contract_id ? getContract(booking.contract_id) : {budget: 'invalid'};
            const service = getService(booking.service_id);
            console.log("Contract", contract);
            bookings.push(
                <tr>
                    <td>{booking.booking_date.split('T')[0]}</td>
                    <td>{service.name}</td>
                    <td>{contract.budget}</td>
                    <td>{booking.status}</td>
                    {booking.status === 'pending' ? <><td><button onClick={() => handleResponse('confirm', booking.id)}>Confirm</button> <button onClick={() => handleResponse('reject', booking.id)}>Reject</button></td></> : ''}
                    {booking.status === 'confirmed' ? <td><button type="button" disabled>Confirmed &#x2713;</button></td> : ''}
                    {booking.status === 'rejected' ? <td><button type="button" disabled>Rejected </button></td> : ''}
                    {booking.status === 'completed' ? <td><button type="button" disabled>Completed &#x2713;</button></td> : ''} 
                </tr>
            )
        });

        identity.services.forEach((service) => {
            myServices.push(
                <section>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                </section>
            );
        });
    }

    return (
        <div>
            <h4>{identity.first_name + ' ' + identity.last_name}</h4>
            <div>
                <h2>Services</h2>
                {myServices}
            </div>
            <h2>Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booking Date</th>
                        <th>Service</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Respond</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings}
                </tbody>
            </table>
        </div>
    );

    
}