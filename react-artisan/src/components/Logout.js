import { useNavigate } from "react-router-dom";

export default function Logout(props) {
    const {setToken} = props;
    const navigate = useNavigate();
    setToken(null);
    navigate('/');
}