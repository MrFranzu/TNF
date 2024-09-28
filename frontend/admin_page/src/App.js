import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Dashboard/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import BookingTrends from './Components/Dashboard/BookingTrends';
import CheckInPatterns from './Components/Dashboard/CheckInPatterns';
import ResourceForecast from './Components/Dashboard/ResourceForecast';
import Login from './Components/Login/Login'; // Import the Login component
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

    const handleLogin = () => {
        setIsAuthenticated(true); // Call this when login is successful
    };

    return (
        <Router>
            {isAuthenticated && <Header />} {/* Only render Header if authenticated */}
            <Routes>
                <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} />} />
                <Route path="/bookings" element={<PrivateRoute isAuthenticated={isAuthenticated} component={BookingTrends} />} />
                <Route path="/checkins" element={<PrivateRoute isAuthenticated={isAuthenticated} component={CheckInPatterns} />} />
                <Route path="/resources" element={<PrivateRoute isAuthenticated={isAuthenticated} component={ResourceForecast} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin to Login */}
            </Routes>
        </Router>
    );
}

export default App;
