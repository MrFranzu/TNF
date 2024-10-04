import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Sidebar from './components/Dashboard/Sidebar';
import Login from './components/Login/Login';
import Event from './components/Dashboard/components/BookingList';
import EventCalendar from './components/Dashboard/components/Calendar';
import QrGenerator from './components/Dashboard/QrGenerator';
import QrScanner from './components/Dashboard/QrScanner'; // Ensure this import is correct
import './App.css'; // Import your CSS file

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="container">
        {isLoggedIn && <Sidebar />} {/* Show Sidebar only when logged in */}
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? (
                <Container>
                  <Grid container spacing={3} className="grid">
                    <Grid item className="grid-item">
                      <h3>Welcome to the Dashboard</h3>
                      <p>Here you can manage your events.</p>
                    </Grid>
                  </Grid>
                </Container>
              ) : (
                <div className="login-form">
                  <Login onLogin={handleLogin} />
                </div>
              )
            } 
          />
          <Route 
            path="/events" 
            element={isLoggedIn ? <Event /> : <div>Please log in to view events.</div>} 
          />
          <Route 
            path="/calendar"  
            element={isLoggedIn ? <EventCalendar /> : <div>Please log in to access the calendar.</div>} 
          />
          <Route 
            path="/qr-generator" 
            element={isLoggedIn ? <QrGenerator /> : <div>Please log in to access the QR Generator.</div>} 
          />
          <Route 
            path="/qr-scanner" 
            element={isLoggedIn ? <QrScanner /> : <div>Please log in to access the QR Scanner.</div>} 
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
