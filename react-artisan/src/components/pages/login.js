import { useState } from "react";

export default function Login(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Post request and store token or render login with fail message
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:5000/api/v1/';  //Remember to complete this
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),  
        })
            .then((response) => {
                if (!response.ok) {
                    ;
                } else {
                    const data = response.json();
                    props.setToken(data.token);     
                }
            })

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    return (
        <form onSubmit={handleSubmit} className='landing'>
            <label htmlFor="email">email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            <input type="submit" value="Log In" />
        </form>
    )
} 