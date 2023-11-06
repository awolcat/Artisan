import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const [current, setCurrent] = useState(null);
  const {token} = props;

  function  handleClick(link) {
    setCurrent(link);
  }
  console.log("NAVBAR ", token)
  return (
    <div className='navbar'>
      <Link to='/' onClick={() => {handleClick('landing')}}
      className={current === 'landing' ? 'currentLink' : ''} >Home</Link>
      <Link to='/about' onClick={() => {handleClick('about')}}
      className={current === 'about' ? 'currentLink' : ''}>About</Link>
      {!token || token === '' || token === undefined ? <Link to='/register'>Register</Link> : <Link to='/logout'>Log Out</Link>}
      {!token || token === '' || token === undefined ? '' : <Link to='my_profile'>Profile</Link> }      
    </div>
  );

}