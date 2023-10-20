export default function Contractors() {
    const people = [
        {name: 'Joe', skill: 'Electrician', rating: 5},
        {name: 'Jane', skill: 'Electrician', rating: 5},
        {name: 'Peter', skill: 'Plumber', rating: 5},
        {name: 'Moe', skill: 'Mechanic', rating: 5},
        {name: 'Thor', skill: 'Electrician', rating: 5},
        {name: 'Parker', skill: 'Networking', rating: 5}
    ];

    const rows = [];
    people.forEach((person) => {
        rows.push(<div className="contractor" key={person.name}>
                    <img alt="contractor" src="https://placehold.co/600x400/png" />
                    <p>Name: {person.name}</p>
                    <p>Trade: {person.skill}</p>
                    <p>Rating: {person.rating}</p>
                  </div>);
    });
    return (
        <div className="contractors">
            {rows}
        </div>
    );
}