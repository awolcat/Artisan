import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Contractors() {
    const [data, setData] = useState(null);
    
    async function fetchData() {
        const response = await fetch('http://127.0.0.1:80/api/v1/contractors');
        const data = await response.json();
        setData(data);
    };

    function getAvgRating(person) {
        let total = 0;
        let count = 0;
        person.bookings.forEach((booking) => {
            if (booking.user_reviews) {
                total += booking.user_reviews.rating;
                count++;
            }
        });
        if (count === 0) {
            return '-'
        }
        return Math.floor(total/count)
    }
    
    const rows = [];

    if (data) {
        data.contractors.forEach((person) => {
            const rating = getAvgRating(person);
            rows.push(<div className="contractor" key={person.id} >
                        <Link to={'/contractors/' + person.id}>
                            <img alt="contractor" src="https://placehold.co/600x400/png" />
                            <p>Name: {person.first_name + ' ' + person.last_name}</p>
                            <p>Skills: {person.skills}</p>
                            <p>Rating: {rating}/5</p>                       
                        </Link>
                    </div>);
        });
    } else {
        rows.push(<Loading />);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <div className="contractors" key='contractors'>
            {rows}
        </div>
    );
}
