import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Hero from './Components/Hero/Hero';
import BookingForm from './Components/BookingForm/BookingForm';
import Contact from './Components/Contact/Contact';
import Admin from './Components/Admin/Admin';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Home />
          </>
        );
      case 'about':
        return <About />;
      case 'booking':
        return <BookingForm />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin isNavOpen={isNavOpen} toggleNav={toggleNav} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}> {/* Apply dark mode class */}
      <Header 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} 
        toggleNav={toggleNav} 
        isNavOpen={isNavOpen} 
        toggleTheme={toggleTheme} // Pass toggle function to Header
        isDarkMode={isDarkMode} // Pass dark mode state to Header
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
