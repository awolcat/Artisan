import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


export default function Contract(props) {
    const { serviceId, contractor_id } = useParams();
    const [ service, setService] = useState(null);
    const [contractor, setContractor] = useState(null);
    //const {token, identity} = useToken();
    const {token, identity, setUser} = props;
    const navigate = useNavigate();

    
    const [ formData, setFormData] = useState({
                                        service_id: serviceId,
                                        status: 'pending',
                                        user_id: identity.id,
                                        description: '',
                                        end_date: '',
                                        start_date: '',
                                        budget: 0.00,
                                        });
    //Function run after render to get data about the current service: User
    async function getService(serviceId) {
        try {
            const response = await fetch('https://' + window.location.hostname + '/api/v1/services/' + serviceId);
            const data = await response.json();
            setService(data);
        }
        catch (error) {
            alert(error);
        }
        
    }

    async function getContractor(contractor_id) {
        try {
            const response = await fetch('https://' + window.location.hostname + '/api/v1/contractors/' + contractor_id);
            const data = await response.json();
            setContractor(data);
        }
        catch (error) {
            alert(error);
        }
    }
    
    async function getIdentity() {
        //Get Identity and update App state
        try {
            const idUrl = 'https://' + window.location.hostname + '/current_user';
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

    //handle change in form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        async function submitContract() {
            const response = await fetch('https://' + window.location.hostname + '/api/v1/contracts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(formData),
            });
            const contractData = await response.json()
            if (response.status === 200) {
                //In the background, create a booking that the contractor will be able to accept or reject
                const bookingResponse = await fetch('https://' + window.location.hostname + '/api/v1/bookings', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({
                        'user_id': contractData.user_id,
                        'contract_id': contractData.id,
                        'contractor_id': contractor_id,
                        'service_id': service.id,
                        'status': 'pending',
                        'booking_date': formData.start_date,
                        }),             
                    });
                if (bookingResponse.status === 200) {
                    await getIdentity(); //Unique value to update App state
                    alert(`A request for: ${service.name} was sent ${formData.description}`);
                    navigate('/my_profile');
                } else {
                    alert('error');
                }
            }
        }

        await submitContract();
        
    }

    useEffect(() => { getService(serviceId);}, [serviceId]); //Get service data
    useEffect(() => { getContractor(contractor_id) }, [contractor_id]); //Get Contractor data
    const details = [];

    if (service && contractor) {
        details.push( <>
                    <h2>Make a Direct Offer</h2>
                    <p>Your offer will be sent to {contractor.first_name} for their {service.name} service.</p>
                    <h3>Service Description</h3>
                    <p key='contract_service_description'>{service.description}</p>
                </>
                );
    } else {
        details.push(<p key='contract_loading'>Loading...</p>);
    }

    if (service && contractor) {
        details.push(
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Enter a brief description for your project</label>
                <textarea name='description' rows="10" cols="10" wrap="hard" value={formData.description} onChange={handleChange} required></textarea>
                <label htmlFor="start_date">When should work begin?</label>
                <input type='datetime-local' name='start_date' value={formData.start_date} onChange={handleChange} required />
                <label htmlFor='budget'>Budget</label>
                <input type='number' name='budget' value={formData.budget} onChange={handleChange} required/>
                <input type='submit' value='Send Offer' />
            </form>
        );
    } 
    return (
        <div className='contract-form'>
            { details }
        </div>
    );
}
