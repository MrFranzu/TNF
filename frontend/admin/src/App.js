import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from './components/Dashboard/Header';
import Sidebar from './components/Dashboard/Sidebar';
import MainContent from './components/Dashboard/MainContent';
import Login from './components/Login/Login';
import './App.css'; // Import your CSS file

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={isLoggedIn ? (
            <>
              <div className="sidebar"><Sidebar /></div>
              <div style={{ flexGrow: 1 }}>
                <Header />
                <Container>
                  <Grid container spacing={3}>
                    <MainContent />
                  </Grid>
                </Container>
              </div>
            </>
          ) : (
            <div className="login-form"><Login onLogin={handleLogin} /></div>
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
