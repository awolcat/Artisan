import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Contractors() {
    //Returns contractors page
    const [data, setData] = useState(null);
    
    async function fetchData() {
        //Get registered contractors
        try {
            const response = await fetch('https://' + window.location.hostname + '/api/v1/contractors');
            const data = await response.json();
            setData(data);
        }
        catch (error) {
            alert(error);
        }
    };

    function getAvgRating(person) {
        //Calculate average contractor rating based on all available reviews
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
                        <div className="contractor-img">
                            <img alt="contractor" src="https://placehold.co/600x400/png" />
                        </div>
                        <Link to={'/contractors/' + person.id}>
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
