import { useNavigate } from "react-router-dom";
import Landing from "./pages/landing";

export default function Logout(props) {
    const {setUser} = props;
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
    setUser({token: null, obj: null});
    const navigate = useNavigate();
    navigate('/');
    //return (<Landing />);
}