import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmailIcon from '@mui/icons-material/Email';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from './tnf.png';

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleEventsClick = () => {
    navigate('/events');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleQrGeneratorClick = () => {
    navigate('/qr-generator');
  };

  const handleQrScannerClick = () => {
    navigate('/qr-scanner'); // Navigate to the QR scanner route
  };

  const ListItemLink = ({ icon, text, onClick, button }) => (
    <ListItem button={button} className="listItem" onClick={onClick}>
      <ListItemIcon className="listItemIcon">{icon}</ListItemIcon>
      <ListItemText primary={text} className="listItemText" />
    </ListItem>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer} className="hamburgerButton">
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        className="drawer"
      >
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
            onClick={handleCalendarClick}
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
            text="QR Code Generator"
            button
            onClick={handleQrGeneratorClick}
          />
          <ListItemLink
            icon={<QrCodeIcon />}
            text="QR Code Scanner"
            button
            onClick={handleQrScannerClick}
          />
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
