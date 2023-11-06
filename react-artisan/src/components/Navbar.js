import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

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
      {!token || token === '' || token === undefined ? <></> : <Link to='/logout'>Log Out</Link>}
      
    </div>
  );

}