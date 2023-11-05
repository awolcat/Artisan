import { useState } from "react";
import Cookies from 'js-cookie';

export default function Login(props) {
    
    const {setGlobalToken} = props;
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [identity, setIdentity] = useState(null);
    
    const [loginType, setLoginType] = useState(null);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loginType === null) {
            alert('Please indicate your role by clicking "Contractor" or ""Client')
        }
        const url = loginType === 'client' ? 'http://127.0.0.1:5000/login-user' : 'http://127.0.0.1:5000/login-contractor'; 
        
        // Post request function
        async function login() {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),  
            });
            const result = await response.json()
            const token = getCookie('access_token');
            setGlobalToken(token);
            console.log("TOKEN:", token);
            setIdentity(result);
            console.log("Cookies ", Cookies.get('csrf_access_token'));
            console.log(result.message)
        }
        catch (error) {
            console.log(error)
        }
        
    }
    login();
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