import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {

   return (
        <div className="landing">
            <p>Artisan.</p>
            <h2>A gig platform for skilled tradespeople</h2>
            <h3>I'm looking for...</h3>
            <div className="landingbuttons">
                <Link to='/contractors'>Contractors</Link>
                <Link to='/jobs'>Jobs</Link>
            </div>
        </div>
    );
}