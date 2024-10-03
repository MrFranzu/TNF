import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Sidebar from './components/Dashboard/Sidebar';
import MainContent from './components/Dashboard/MainContent';
import Login from './components/Login/Login';
import Event from './components/Dashboard/Event';
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
                  <Grid container spacing={3}>
                    <MainContent />
                  </Grid>
                </Container>
              ) : (
                <div className="login-form"><Login onLogin={handleLogin} /></div>
              )
            } 
          />
          <Route 
            path="/events" 
            element={
              isLoggedIn ? <Event /> : <div>Please log in to view events.</div>
            } 
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
