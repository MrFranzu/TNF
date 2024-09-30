import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import './MainContent.css'; // Import the CSS file

const MainContent = () => {
  return (
    <Grid container spacing={2} className="gridContainer">
      <Grid item xs={12} md={6}>
        <Paper className="paper">
          <Typography variant="h6" className="typography">Peak Booking Month</Typography>
          <div className="chart">Line Chart</div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className="paper">
          <Typography variant="h6" className="typography">Popular Events in 2023</Typography>
          <div className="chart">Bar Chart</div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className="paper">
          <Typography variant="h6" className="typography">Event Types</Typography>
          <div className="chart">Pie Chart</div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className="paper">
          <Typography variant="h6" className="typography">Reviews from Recent Events</Typography>
          <div className="chart">Reviews</div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainContent;
