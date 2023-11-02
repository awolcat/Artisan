import {useParams} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react';


export default function Profile() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const fetchData = useCallback(
        async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/api/v1/contractors/' + id);
        const data = await response.json();
        setData(data);
    }, [id])

    const rows = [];
    const services = [];

    if (data) {
        data.service_offers.forEach((service) => {
            services.push(
                <div className='service' key={service.id}>
                    <p key={service.id}>{service.name}</p>
                    <p key={service.id + 1}>{service.status}</p>
                    <a href=''>Book</a>
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
    useEffect(() => { fetchData(); }, [fetchData, id]);

    return (
        <div className='profile'>{ rows }</div>
    );
}