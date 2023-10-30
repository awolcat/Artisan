import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [current, setCurrent] = useState(null);

  function  handleClick(link) {
    setCurrent(link);
  }

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => {handleClick('landing')}}
      className={current === 'landing' ? 'currentLink' : ''}>Home</Link>
      <Link to='/about' onClick={() => {handleClick('about')}}
      className={current === 'about' ? 'currentLink' : ''}>About</Link>
    </div>
  );

}