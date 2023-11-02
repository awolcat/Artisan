export default function profileServices(data) {
    const rows = [];
    data.forEach((service) => {
        rows.push(
            <div className='service'>
                <p>{service.name}</p>
                <p>{service.availablity}</p>
            </div>
        );
    });

    return (
        <div className='services'>
            {rows}
        </div>
    )
}