import ContractorPP from "../ContractorPP";
import ClientPP from "../ClientPP";

export default function PrivateProfile(props) {
    const { identity, setUser } = props;
    const rows = [];

    
    const role = identity?.services || identity?.services.length === 0 ? 'contractor' : 'client' 

    if (role === 'client') {
        rows.push(<ClientPP identity={identity} setUser={setUser}/>);
    } else if (role === 'contractor') {
        rows.push(<ContractorPP identity={identity} setUser={setUser}/>);
    }

    return (
        <div className="private-profile">
            {rows}
        </div>
    )

}