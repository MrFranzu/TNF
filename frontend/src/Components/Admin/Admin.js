// src/Components/Header/Header.js
import React from 'react';
import './Admin.css'; 

const Header = ({ setCurrentPage, currentPage, toggleNav, isNavOpen }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <header className="header">
      <nav>
        {/* Conditionally render the nav-toggle button only on the Admin page */}
        {currentPage === 'admin' && (
          <button className="nav-toggle" onClick={toggleNav}>
            {isNavOpen ? '✖' : '☰'}
          </button>
        )}

        <ul className="nav-list">
          <li><button onClick={() => handlePageChange('home')}>Home</button></li>
          <li><button onClick={() => handlePageChange('about')}>About</button></li>
          <li><button onClick={() => handlePageChange('contact')}>Contact Us</button></li>
          <li><button onClick={() => handlePageChange('admin')}>Admin</button></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
