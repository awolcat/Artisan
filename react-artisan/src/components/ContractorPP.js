import { useState, useEffect } from 'react';

export default function ContractorPP(props) {
    const {identity, setUser} = props;
    const [contracts, setContracts] = useState(null);
    const [services, setServices] = useState(null);

    const bookings = [];
    const myServices = [];
    //form data to add a service as a contractor
    const [ formData, setFormData] = useState({
        name: '',
        description: '',
        });
    
    //handle change in form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    //submit form data
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        async function submitContract() {
            try {
                await fetch('http://127.0.0.1:5000/api/v1/services', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'contractor': identity,
                                      'name': formData.name,
                                      'description': formData.description}),
            });
            }
            catch (error) {
                alert(error);
            }
            
        }
        await submitContract();
        setFormData({name: '', description: ''});
        await getIdentity();
    }


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

    async function fetchContracts() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/contracts/');
            const data = await response.json();
            setContracts(data);
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => { fetchContracts() }, []);

    function getContract(id) {
        for (const contract of contracts) {
            if (contract.id === id) {
                return (contract)
            }
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
                alert('Something went wrong while logging you in. Try again');
            }
    }
    
    async function handleResponse(answer, contract, booking) {
        let obj = {'status': ''};
        if (answer === 'confirm') {
            obj.status = 'confirmed';
        } else if (answer === 'reject') {
            obj.status = 'rejected';  
        }
        try {
            const url = 'http://127.0.0.1:5000/api/v1/contracts/' + contract;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                const url = 'http://127.0.0.1:5000/api/v1/bookings/' + booking;
                await fetch(url, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify(obj),
                });
            }
            await getIdentity();
            if (!response.ok) {
                alert('Something went wrong. Try again later');
            }
        }
        catch (error) {
            alert('Something went wrong. Try again later.')
        }
    }

    if (contracts && services && identity?.bookings) {
        identity.bookings.forEach((booking) => {
            const contract = booking?.contract_id ? getContract(booking.contract_id) : {budget: 'invalid'};
            const service = getService(booking.service_id);
            bookings.push(
                <tr>
                    <td>{booking.booking_date.split('T')[0]}</td>
                    <td>{service.name}</td>
                    <td>{contract.budget}</td>
                    <td>{booking.status}</td>
                    {booking.status === 'pending' ? <><td><button onClick={() => {handleResponse('confirm', contract.id, booking.id)}}>Confirm</button> <button onClick={() => {handleResponse('reject', contract.id, booking.id)}}>Reject</button></td></> : ''}
                    {booking.status === 'confirmed' ? <td><button type="button" disabled>Confirmed &#x2713;</button></td> : ''}
                    {booking.status === 'rejected' ? <td><button type="button" disabled>Rejected </button></td> : ''}
                    {booking.status === 'completed' ? <td><button type="button" disabled>Completed &#x2713;</button></td> : ''} 
                </tr>
            )
        });

        identity.services.forEach((service) => {
            myServices.push(
                <section className='service'>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                </section>
            );
        });
    }

    return (
        <div className='client-private-profile'>
            <h2>Personal Profile</h2>
            <div className="personal-details">
                <div className="profile-img">
                    <img alt='contractor' src='https://placehold.co/600x400/png' />
                </div>
                <div className="profile-details">
                    <div className="details-block"><div className="label">Name</div> <div className="profile-detail">{identity.first_name + ' ' + identity.last_name}</div></div>
                    <div className="details-block"><div className="label">Email</div> <div className="profile-detail">{identity.email}</div></div>
                    <div className="details-block"><div className="label">Address</div> <div className="profile-detail">{identity.address}</div></div>
                </div>
            </div>
            <div className='services'>
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
            <h2>Register Service</h2>
            <form onSubmit={handleSubmit} className='contractor-add-service'>
                <label htmlFor='name'>Service</label>
                <select id="name" name="name" value={formData.name} onChange={handleChange} required>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Appliances Repair">Appliances Repair</option>
                    <option value="Painting">Painting</option>
                    <option value='Plumbing'>Plumbing</option>
                    <option value='Plumbing'>Landscaping</option>
                </select>
                <label htmlFor='description'>Description </label>
                <textarea name='description' rows="10" cols="10" wrap="hard" value={formData.description} onChange={handleChange} required></textarea>
                <input type='submit' value='Add Service' />
            </form>
            <div className='padding'>

            </div>
        </div>
    );

    
}
