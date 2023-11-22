import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const [current, setCurrent] = useState(null);
  const {identity} = props;

  function  handleClick(link) {
    setCurrent(link);
  }

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => {handleClick('landing')}}
      className={current === 'landing' ? 'currentLink' : ''} >Home</Link>
      <Link to='/about' onClick={() => {handleClick('about')}}
      className={current === 'about' ? 'currentLink' : ''}>About</Link>
      {identity === null || !identity || identity === '' || identity === undefined ? 
      <><Link to='/register' onClick={() => {handleClick('register')}} className={current === 'register' ? 'currentLink' : ''}>Register</Link> 
      <Link to='/login' onClick={() => {handleClick('login')}} className={current === 'login' ? 'currentLink' : ''}>Log In</Link> 
      </>:
      <Link to='/logout' >Log Out</Link>}
      {identity === null || !identity || identity === '' || identity === undefined ? '' : <Link to='my_profile' onClick={() => {handleClick('profile')}} className={current === 'profile' ? 'currentLink' : ''}>Profile</Link> }      
    </div>
  );

}