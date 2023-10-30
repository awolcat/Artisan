import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Contractors() {
    const [data, setData] = useState(null);
    
    async function fetchData() {
        const response = await fetch('https://swapi.dev/api/people');
        const data = await response.json();
        setData(data);
    };
    
    const rows = [];

    if (data) {
        data.results.forEach((person, index) => {
            rows.push(<div className="contractor" key={index}>
                        <a href={'/contractors/' + person.birth_year}>
                            <img alt="contractor" src="https://placehold.co/600x400/png" />
                            <p>Name: {person.name}</p>
                            <p>Born: {person.birth_year}</p>
                            <p>Height: {person.height}</p>
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