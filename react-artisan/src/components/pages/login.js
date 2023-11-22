import { useState } from "react";
import { useNavigate} from 'react-router-dom';


export default function Login(props) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [loginType, setLoginType] = useState(null);
    let loggedIn = false;

    const navigate = useNavigate();

    const {setUser} = props;

    async function getIdentity() {
        // Get user identity from token 
        try {
            const idUrl = loginType === 'client' ? 'https://' + window.location.hostname + '/current_user' : 'https://' + window.location.hostname + '/current_contractor';
            const response = await fetch(idUrl, {
                headers: {'Authorization': localStorage.getItem('token'),},
                });
            const result = await response.json();
            setUser({token: localStorage.getItem('token'), obj: result});
        }     
        catch (error) {
            alert('Something went wrong while logging you in. Try again');
        }
    }

    async function login() {
        //Request token for provided credentials
        const url = loginType === 'client' ? 'https://' + window.location.hostname + '/login-user' : 'https://' + window.location.hostname + '/login-contractor'; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify(formData),  
            });
            const result = await response.json();
            const tok = 'Bearer' + ' ' + result['access-token'];
            localStorage.setItem('token', tok);
            localStorage.setItem('role', loginType);
            loggedIn =  response.ok ? true : false;
            if (response.ok) {
                loggedIn = true;
            } else {
                alert('Wrong username or password');
            }
        }
        catch (error) {         
            alert('Something went wrong while logging you in. Try again');
        }
    }

    const handleSubmit = async (event) => {
        //Submit login credentials and request authorized user identity
        event.preventDefault();

        if (loginType === null) {
            alert('Please indicate your role by clicking "Contractor" or ""Client')
        } else {
            await login();
            if (loggedIn) {
                await getIdentity();
                navigate('/');
            }
        }
    }
        
        
        //loginType === 'client' ? navigate('/contractors') : navigate('/jobs')


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleClick = (type) => {
        setLoginType(type);
    }

    return (
        <div className='landing'>
            <div className='login'>
                <div className='login-border'>
                        <div className='login-role'>
                            <button className={loginType === 'contractor' ? 'selected' : ''} onClick={() => { handleClick('contractor') }}>Contractor</button>
                            <p>&#8212; OR &#8212;</p>
                            <button className={loginType === 'client' ? 'selected' : ''} onClick={() => { handleClick('client') }}>Client</button> 
                            
                        </div>  
                        <form onSubmit={handleSubmit}>
                            <small>Hint: Login as a Visitor!</small>
                            <small>email: guestclient01@example.com OR guestcontractor01@example.com</small>
                            <small>password: 12345six</small>
                            <label htmlFor="email">email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                            <input type="submit" value="Log In" />
                        </form>
                    </div>
            </div>
         
        </div>
    )
} 
