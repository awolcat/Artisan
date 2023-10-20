import React from 'react';
import NavLink from '../NavLink';

export default function Landing() {
    return (
        <div className="home">
            <h1>Artisan</h1>
            <h2>Welcome to Artisan, a gig platform for skilled tradespeople</h2>
            <h3>I'm looking for...</h3>
            <div className="homebuttons">
                <NavLink dest='/contractors' label='Contractors'/>
                <NavLink dest='/jobs' label='Jobs' />
            </div>
        </div>
    );
}