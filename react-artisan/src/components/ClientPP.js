export default function ClientPP(props) {
    const {identity} = props;

    return (
        <>
            <h4><small>Client Name:</small> {identity.first_name + ' ' + identity.last_name}</h4>
        </>
    );

    
}