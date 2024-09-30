// src/Components/Contact/Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form>
        <label htmlFor="number">Phone Number</label>
        <h3>xxxx-xxx-xxxx</h3>

        <label htmlFor="email">Email</label>
        <h3>email@gmail.com</h3>

        <label htmlFor="link">Facebook</label>
        <h3>xhttps//Facebook</h3>

      </form>
    </div>
  );
};

export default Contact;
