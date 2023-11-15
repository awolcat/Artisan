import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';


export default function Profile(props) {
    const { id } = useParams(); // Get contractor_id from parameters
    const [data, setData] = useState(null); //data refers to contractor
    const {identity} = props;

    //fetch contractor data
    async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/api/v1/contractors/' + id);
        const data = await response.json();
        setData(data);

    }

    const rows = [];
    const services = [];

    if (data) {
        data.services.forEach((service) => {
            services.push(
                <div className='service' key={service.id}>
                    <p key={service.id}>{service.name}</p>
                    <p>{service.description}</p>
                    
                    {localStorage.getItem('role') === 'client' ? <Link to={'/service/' + service.id + '/contract/' + id }>Book</Link> : ''}
                </div>
            );
        });

        rows.push(
            <>
                <img alt='contractor' src='https://placehold.co/600x400/png' />
                <p key={data.id}>{data.first_name + ' ' + data.last_name} | {data.skills}</p>
                <div className='services'>
                    {services} 
                </div>      
            </>
        );
    } else {
        rows.push(<p className='loading'>Loading....</p>);
    }
 
    useEffect(() => { fetchData(); }, []);

    return (
        <div className='profile'>
            { rows }
        </div>
    );
}
