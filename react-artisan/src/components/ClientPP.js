import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostJob from "./pages/PostJob";
import Loading from "./Loading";

export default function ClientPP(props) {
    const {identity, setUser} = props;
    const [services, setServices] = useState(null);
    const [divId, setDivId] = useState(null);
    const bookings = [];

    async function fetchServices() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/services/');
            const data = await response.json();
            setServices(data);
        }
        catch (error) {
            alert(error);
        }
        
    }

    useEffect(() => { fetchServices() }, []);

    function getService(id) {
        for (const service of services.services) {
            if (service.id === id) {
                return (service)
            }
        }
    }

    async function getIdentity() {
        // Get user identity
        try {
            const idUrl = 'http://127.0.0.1:5000/current_user';
            const response = await fetch(idUrl, {
                    headers: {'Authorization': localStorage.getItem('token')},
                });
            const result = await response.json();
            setUser({token: localStorage.getItem('token'), obj: result});
        }
        catch (error) {
            alert('Something went wrong while logging you in. Try again');
        }
    }

    async function handleComplete(contract, booking ) {
        try {
            const url = 'https://' + window.location.hostname + '/api/v1/contracts/' + contract;
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
            alert(error);
        }
        
    }

    function handleClick(id) {
        setDivId(id);
    }
    
    if (services) {
        const count = 0;
        identity.contracts.forEach((contract) => {
            identity.bookings.forEach((booking, index) => {
                if (contract.id === booking.contract_id) {
                    count++;
                    const service = getService(booking.service_id);
                    bookings.push(
                        <tr key={index}>
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
        if (count < 1) {
            bookings.push(<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>)
        }
    }

    return (
        <div className='client-private-profile'>
            <h2>Personal Profile</h2>
            <div className="personal-details">
                <div className="profile-img">
                    <img alt='client' src='https://placehold.co/600x400/png' />
                </div>
                <div className="profile-details">
                    <div className="details-block"><div className="label">Name</div> <div className="profile-detail">{identity.first_name + ' ' + identity.last_name}</div></div>
                    <div className="details-block"><div className="label">Email</div> <div className="profile-detail">{identity.email}</div></div>
                    <div className="details-block"><div className="label">Address</div> <div className="profile-detail">{identity.address}</div></div>
                </div>
            </div>
            <div className='project-history'>
                <h2>Project History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Booking Date</th>
                            <th>Service</th>
                            <th>Budget</th>
                            <th>Contractor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                </table>
            </div>
            <div className="open-form">
                <button onClick={() => {handleClick('post-job-form')}}>Publish a Job</button>
            </div>
            <div className='post-job-form' id={divId}>
                {<PostJob services={services} identity={identity} setUser={setUser} handleClick={handleClick}/>}
            </div>
            
        </div>
    );

    
}
