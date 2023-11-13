import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function ClientPP(props) {
    const {identity, setUser} = props;
    const [services, setServices] = useState(null);
    const bookings = [];

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


    async function handleComplete(contract, booking ) {
        try {
            const url = 'http://127.0.0.1:5000/api/v1/contracts/' + contract;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({'status': 'completed'}),
                headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            const bkurl = 'http://127.0.0.1:5000/api/v1/bookings/' + booking;
            const res = await fetch(bkurl, {
                method: 'PUT',
                body: JSON.stringify({'status': 'completed'}),
                headers: {'Content-Type': 'application/json'}
            });
        }
        await getIdentity();
        }
        catch (error) {
            alert('Could not delete');
        }
        
    }
    
    if (services) {
        identity.contracts.forEach((contract) => {
            identity.bookings.forEach((booking) => {
                if (contract.id === booking.contract_id) {
                    const service = getService(booking.service_id);
                    bookings.push(
                        <tr>
                            <td>{booking.booking_date.split('T')[0]}</td> 
                            <td>{service.name}</td> 
                            <td>{contract.budget}</td>
                            <td><Link to={'/contractors/' + booking.contractor_id}>Contractor</Link></td> 
                            <td>{booking.status}</td>
                            { booking.status === 'confirmed' | booking.status === 'accepted' ? <td><button onClick={() => {handleComplete(contract.id, booking.id)}}>Mark Complete</button></td> : '' }
                        </tr>
                    )
                }
            })
        });
    }
    


    return (
        <div className='booking-details'>
            <h2>Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booking Date</th>
                        <th>Service</th>
                        <th>Budget</th>
                        <th></th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings}
                </tbody>
            </table>
        </div>
    );

    
}