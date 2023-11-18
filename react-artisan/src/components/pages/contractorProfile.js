import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';


export default function Profile(props) {
    const { id } = useParams(); // Get contractor_id from parameters
    const [data, setData] = useState(null); //data refers to contractor
    const {identity} = props;

    
    async function fetchData() {
        //fetch contractor data
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/contractors/' + id);
            const data = await response.json();
            setData(data);
        }
        catch (error) {
            alert(error);
        }
    }

    const rows = [];
    const services = [];

    if (data) {
        //Build contractor services segement 
        data.services.forEach((service) => {
            services.push(
                <div className='service' key={service.id}>
                    <p className='heading' key={service.id}>{service.name}</p>
                    <p className='description'>{service.description}</p>
                    
                    {localStorage.getItem('role') === 'client' ? <Link to={'/service/' + service.id + '/contract/' + id }>Book</Link> : ''}
                </div>
            );
        });
        //Build profile
        rows.push(
            <div className='profile'>
                <div className='profile-heading'>
                    <div className='profile-img'>
                        <img alt='contractor' src='https://placehold.co/600x400/png' />
                    </div>
                    <p key={data.id}>{data.first_name + ' ' + data.last_name} | {data.skills}</p>
                </div>
                <div className='services'>
                    <h2>Services</h2>
                    {services} 
                </div>      
            </div>
        );
    } else {
        rows.push(<p className='loading'>Loading....</p>);
    }
 
    useEffect(() => { fetchData(); }, []);

    return (
        <div className='profile-container'>
            { rows }
            <div className='padding'>
            </div>
        </div>
    );
}
