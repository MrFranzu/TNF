import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import QrScanner from './QrScanner'; // Import the QR Scanner
import './MainContent.css'; // Import the CSS file

const MainContent = () => {
  const [showScanner, setShowScanner] = useState(false);

  const toggleScanner = () => {
    setShowScanner((prev) => !prev);
  };

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
      {/* QR Scanner Section */}
      <Grid item xs={12}>
        <Paper className="paper">
          <Typography variant="h6" className="typography">
            QR Code Scanner
            <button onClick={toggleScanner} style={{ marginLeft: '1px' }}>
              {showScanner ? 'Hide Scanner' : 'Show Scanner'}
            </button>
          </Typography>
          {showScanner && <QrScanner />} {/* QR Scanner Component */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainContent;
