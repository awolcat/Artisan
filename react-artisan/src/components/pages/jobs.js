export default function Jobs() {
    const people = [
        {name: 'Joe', openContracts: [1, 2, 3, 4]},
        {name: 'Jane', openContracts: [1, 2]},
        {name: 'Peter', openContracts: []},
        {name: 'Moe', openContracts: [1, 2, 3]},
        {name: 'Thor', openContracts: []},
        {name: 'Parker', openContracts: [1]}
    ];

    const rows = [];
    people.forEach((person) => {
        for (const contract of person.openContracts) {
        rows.push(<div className="job" key={contract}>
                    <img alt="job description" src="https://placehold.co/600x400/png" />
                    {contract}
                  </div>);
                  }
    });
    return (
        <div className="jobs">
            {rows}
        </div>
    );
}