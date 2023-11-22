import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        phone_number: '',
        password: '',
    })

    const [role, setRole] = useState("");

    //Post new user or contractor
    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === null) {
            alert('Please indicate your role by clicking "Contractor" or ""Client')
        }
        const url = role === 'client' ? 'https://' + window.location.hostname + '/api/v1/users' : 'https://' + window.location.hostname + '/api/v1/contractors'; 
        
        // Post request function
        async function registrar() {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),  
            });
            if (response.ok) {
                alert(`${role} Registration Successful`);
            } else {
                alert('Something went wrong while trying to sign you up, please try again');
            }
            
        }
        catch (error) {
            console.log(error)
            alert('Something went wrong while trying to sign you up, please try again');
        }
        
    }
    registrar();
    if (role) {
    navigate('/login');
    }
}
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleClick = (type) => {
        setRole(type);
    }
    
    return (
        <div className='landing'>
            <div className='register-container'>
                <div className="registration-form">
                    <div className='register-role'>
                        <button className={role === 'contractor' ? 'selected' : ''} onClick={() => { handleClick('contractor') }}>Contractor</button>
                        <p>&#8212; OR &#8212;</p>
                        <button className={role === 'client' ? 'selected' : ''} onClick={() => { handleClick('client') }}>Client</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder='First Name' minlength='2' maxlength='26' required/>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder='Last Name' minlength='2' maxlength='26' required/>
                        <label htmlFor="address">Physical Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="address" minlength="8" maxlength="40" required/>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required/>
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder='+XXX XXX XXX XXX' minlength="10" maxlength="13" required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required/>
                    
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    );
    }
