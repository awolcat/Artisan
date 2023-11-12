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

     // Get user identity
    // 'X-CSRF-TOKEN': csrfToken
    async function getIdentity() {
        const idUrl = loginType === 'client' ? 'http://127.0.0.1:5000/current_user' : 'http://127.0.0.1:5000/current_contractor';
        
                const response = await fetch(idUrl, {
                    headers: {'Authorization': localStorage.getItem('token'),},
                });
                const result = await response.json();
                setUser({token: localStorage.getItem('token'), obj: result});
                //return (result)
                //console.log("CURRENT_USER", result);
         /*   }
            catch (error) {
                alert('Something went wrong while logging you in. Try again');
            }*/
    }

    // Post request function
    async function login() {
        const url = loginType === 'client' ? 'http://127.0.0.1:5000/login-user' : 'http://127.0.0.1:5000/login-contractor'; 
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
            //getIdentity();
            //console.log("TEMP", temp);
            //setIdentity(getIdentity());
        }
        catch (error) {
            //setIdentity(null);
            //setToken(null);         
            alert('Something went wrong while logging you in. Try again');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loginType === null) {
            alert('Please indicate your role by clicking "Contractor" or ""Client')
        }
        await login();
        if (loggedIn) {
            await getIdentity();
            navigate('/');
        }
        
        //loginType === 'client' ? navigate('/contractors') : navigate('/jobs')
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