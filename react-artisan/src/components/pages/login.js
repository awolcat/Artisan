import { useState } from "react";
import { useNavigate} from 'react-router-dom';


export default function Login(props) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [loginType, setLoginType] = useState(null);

    const navigate = useNavigate();

    const {setToken, setIdentity} = props;

    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (loginType === null) {
            alert('Please indicate your role by clicking "Contractor" or ""Client')
        }
        const url = loginType === 'client' ? 'http://127.0.0.1:5000/login-user' : 'http://127.0.0.1:5000/login-contractor'; 
        const idUrl = loginType === 'client' ? 'http://127.0.0.1:5000/current_user' : 'http://127.0.0.1:5000/current_contractor'
        
        // Get user identity
    // 'X-CSRF-TOKEN': csrfToken
    async function getIdentity() {
        try {
                const response = await fetch(idUrl, {
                    headers: {'Authorization': localStorage.getItem('token'),},
                });
                const result = await response.json();
                if (response.ok) {
                    setIdentity(result);
                }
            }
            catch (error) {
                alert(error);
            }
    }

    // Post request function
    async function login() {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),  
            });
            const result = await response.json();
            if (response.ok) {
                const tok = 'Bearer' + ' ' + result['access-token'];
                localStorage.setItem('token', tok);
                setToken(localStorage.getItem('token'))
                getIdentity();
            }
        }
        catch (error) {
            alert(error);
        }
        
    }
    login();
    loginType === 'client' ? navigate('/contractors') : navigate('/jobs')
}

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleClick = (type) => {
        setLoginType(type);
    }

    return (
        <div className='landing'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                <input type="submit" value="Log In" />
            </form>
            <button onClick={() => { handleClick('contractor') }}>Contractor</button>
            <button onClick={() => { handleClick('client') }}>Client</button>
        </div>
    )
} 