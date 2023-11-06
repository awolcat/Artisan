//import { useNavigate } from "react-router-dom";
import Landing from "./pages/landing";

export default function Logout(props) {
    const {setToken} = props;
    setToken(null);
    //const navigate = useNavigate();
    //navigate('/');
    return (<Landing />);
}