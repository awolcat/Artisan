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
            const response = await fetch('https://' + window.location.hostname + '/api/v1/services', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'contractor': identity,
                                      'name': formData.name,
                                      'description': formData.description}),
            });
        }
        await submitContract();
        await getIdentity();
    }


    async function fetchServices() {
        const response = await fetch('https://' + window.location.hostname + '/api/v1/services/');
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
        const response = await fetch('https://' + window.location.hostname + '/api/v1/contracts/');
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
        const idUrl = 'https://' + window.location.hostname + '/current_contractor';
        
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
    
    async function handleResponse(answer, contract, booking) {
        let obj = {'status': ''};
        if (answer === 'confirm') {
            obj.status = 'confirmed';
        } else if (answer === 'reject') {
            obj.status = 'rejected';  
        }
        try {
            const url = 'https://' + window.location.hostname + '/api/v1/contracts/' + contract;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                const url = 'https://' + window.location.hostname + '/api/v1/bookings/' + booking;
                const res = await fetch(url, {
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
                    {booking.status === 'pending' ? <><td><button onClick={() => handleResponse('confirm', contract.id, booking.id)}>Confirm</button> <button onClick={() => handleResponse('reject', contract.id, booking.id)}>Reject</button></td></> : ''}
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
                <input type='text' name='description' value={formData.description} onChange={handleChange}/>
                <input type='submit' value='Add Service' />
            </form>
        </div>
    );

    
}
