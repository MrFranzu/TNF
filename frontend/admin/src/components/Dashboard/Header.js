import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Header.css'; // Import the CSS file

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" className="title">
          ---------------- - DASHBOARD -
        </Typography>
        <div className="button-container">
          <Button color="inherit">Events</Button>
          <Button color="inherit">New Events</Button>
          <Button color="inherit">Past Events</Button>
          <Button color="inherit">Year: 2023</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
