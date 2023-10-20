import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink({dest, label}) {

    return (
        <>
        <Link to={dest}>{label}</Link>
        </>
    );
}