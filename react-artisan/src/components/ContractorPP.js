export default function ContractorPP(props) {
    const {identity} = props;

    return (
        <>
            <h4><small>Contractor Name:</small> {identity.first_name + ' ' + identity.last_name}</h4>
        </>
    );

    
}