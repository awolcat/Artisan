import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Contractors() {
    const [data, setData] = useState(null);
    
    async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/api/v1/contractors');
        const data = await response.json();
        setData(data);
    };
    
    const rows = [];

    if (data) {
        data.contractors.forEach((person) => {
            rows.push(<div className="contractor" key={person.id}>
                        <a href={'/contractors/' + person.id}>
                            <img alt="contractor" src="https://placehold.co/600x400/png" />
                            <p>Name: {person.first_name + ' ' + person.last_name}</p>
                            <p>Skills: {person.skills}</p>
                        </a>
                    </div>);
        });
    } else {
        rows.push(<Loading />);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <div className="contractors">
            {rows}
        </div>
    );
}