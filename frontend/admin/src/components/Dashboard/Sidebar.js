import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmailIcon from '@mui/icons-material/Email';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className="drawer"
    >
      <List className="list">
        <ListItem button className="listItem">
          <ListItemIcon className="listItemIcon">
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events" className="listItemText" />
        </ListItem>
        <ListItem button className="listItem">
          <ListItemIcon className="listItemIcon">
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" className="listItemText" />
        </ListItem>
        <ListItem button className="listItem">
          <ListItemIcon className="listItemIcon">
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" className="listItemText" />
        </ListItem>
        <ListItem button className="listItem">
          <ListItemIcon className="listItemIcon">
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Check-in" className="listItemText" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
