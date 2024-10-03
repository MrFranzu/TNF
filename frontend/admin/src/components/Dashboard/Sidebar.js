import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmailIcon from '@mui/icons-material/Email';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrScanner from './QrScanner';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from './tnf.png';

const Sidebar = () => {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const toggleScanner = () => {
    setShowScanner((prev) => !prev);
  };

  const handleEventsClick = () => {
    // Navigate to the Event component and create a new event
    navigate('/events');
  };

  const ListItemLink = ({ icon, text, onClick, button }) => (
    <ListItem button={button} className="listItem" onClick={onClick}>
      <ListItemIcon className="listItemIcon">
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} className="listItemText" />
    </ListItem>
  );

  return (
    <Drawer variant="permanent" anchor="left" className="drawer">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <List className="list">
        <ListItemLink
          icon={<EventIcon />}
          text="Event List"
          button
          onClick={handleEventsClick}
        />
        <ListItemLink
          icon={<CalendarTodayIcon />}
          text="Calendar"
          button
        />
        <ListItemLink
          icon={<AssessmentIcon />}
          text="Analytics"
          button
        />
        <ListItemLink
          icon={<EmailIcon />}
          text="Reserved"
          button
        />
        <ListItemLink
          icon={<QrCodeIcon />}
          text="QR Code Scanner"
          button
          onClick={toggleScanner}
        />
        {showScanner && <QrScanner />}
      </List>
    </Drawer>
  );
};

export default Sidebar;
