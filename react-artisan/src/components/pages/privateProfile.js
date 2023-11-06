import ContractorPP from "../ContractorPP";
import ClientPP from "../ClientPP";

export default function PrivateProfile(props) {
    const { identity } = props;
    const rows = [];

    const role = identity?.services == [] ? 'contractor' : 'client' 

    if (role === 'client') {
        rows.push(<ClientPP identity={identity}/>);
    } else if (role === 'contractor') {
        rows.push(<ContractorPP identity={identity}/>);
    }

    return (
        <div className="private-profile">
            {rows}
        </div>
    )

}