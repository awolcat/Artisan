import ContractorPP from "../ContractorPP";
import ClientPP from "../ClientPP";

export default function PrivateProfile(props) {
    const { identity, setUser } = props;
    const rows = [];
    const role = localStorage.getItem('role');

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