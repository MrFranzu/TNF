import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS

const Header = () => (
    <header>
        
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/bookings">Booking Trends</Link>
            <Link to="/checkins">Check-In Patterns</Link>
            <Link to="/resources">Resource Forecast</Link>
        </nav>
    </header>
);

export default Header;
