import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


export default function Contract(props) {
    const { serviceId, contractor_id } = useParams();
    const [ service, setService] = useState(null);
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
        const response = await fetch('https://' + window.location.hostname + ':80/api/v1/services/' + serviceId);
        const data = await response.json();
        setService(data);
    }
    //Get Identity and update App state
    async function getIdentity() {
        const idUrl = 'https://' + window.location.hostname + ':80/current_user';
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

    //handle change in form data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        async function submitContract() {
            const response = await fetch('https://' + window.location.hostname + ':80/api/v1/contracts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(formData),
            });
            const contractData = await response.json()
            if (response.status === 200) {
                //In the background, create a booking that the contractor will be able to accept or reject
                const bookingResponse = await fetch('https://' + window.location.hostname + ':80/api/v1/bookings', {
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

    useEffect(() => { getService(serviceId);}, [serviceId]); //Get service_offer data
    const details = [];

    if (service) {
        details.push( <>
                    <h2>Book {service.name}</h2>
                    <h3>Description</h3>
                    <p key='contract_service_description'>{service.description}</p>
                </>
                );
    } else {
        details.push(<p key='contract_loading'>Loading...</p>);
    }

    if (service) {
        details.push(
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Description </label>
                <input type='text' name='description' value={formData.description} onChange={handleChange}/>
                <label htmlFor="start_date">Start Date </label>
                <input type='datetime-local' name='start_date' value={formData.start_date} onChange={handleChange} required />
                <label htmlFor='budget'>Budget </label>
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
