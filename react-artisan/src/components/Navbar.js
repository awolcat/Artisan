import React from 'react';
import NavLink from './NavLink';

export default function Navbar() {
  return (
    <div className='navbar'>
      <NavLink dest='/' label='Home' />
      <NavLink dest='/about' label='About' />
    </div>
  );

}