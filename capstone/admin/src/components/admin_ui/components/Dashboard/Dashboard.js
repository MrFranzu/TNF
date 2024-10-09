import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchBookings = async () => {
    try {
      const bookingsCollection = collection(db, 'bookings');
      const snapshot = await getDocs(bookingsCollection);
      if (snapshot.empty) return [];
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      setError(`Failed to fetch bookings: ${error.message || 'Please try again later.'}`);
      throw error;
    }
  };

  useEffect(() => {
    const getBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookingsData = await fetchBookings();
        setBookings(bookingsData);
        processMonthlyData(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  const processMonthlyData = (data) => {
    const monthlyCounts = {};
    data.forEach(booking => {
      const date = formatTimestamp(booking.eventDate);
      const month = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    setMonthlyData(monthlyCounts);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredMonthlyData = Object.entries(monthlyData).filter(([month]) => {
    const [monthName, year] = month.split(' ');
    const monthIndex = new Date(Date.parse(monthName + " 1, 2020")).getMonth();
    return monthIndex === parseInt(selectedMonth) && parseInt(year) === selectedYear;
  });

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#ffe4e1',
      padding: '20px',
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#ffebcd',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h1 style={{
          color: '#ff69b4',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        }}>Dashboard</h1>
        <div>
          <input 
            type="number" 
            value={selectedYear} 
            onChange={handleYearChange} 
            min="2000" 
            max={new Date().getFullYear()} 
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ff69b4',
              backgroundColor: '#ffe4e1',
              color: '#ff69b4',
              marginLeft: '10px',
            }}
          />
          <select value={selectedMonth} onChange={handleMonthChange} style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ff69b4',
            backgroundColor: '#ffe4e1',
            color: '#ff69b4',
            marginLeft: '10px',
          }}>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main style={{
        flex: 1,
        overflowY: 'auto',
      }}>
        {loading ? (
          <div style={{ color: '#ff8c69', fontSize: '18px', fontStyle: 'italic' }}>Loading...</div>
        ) : error ? (
          <div style={{ color: '#ff4500', fontSize: '18px' }}>{error}</div>
        ) : (
          <div>
            <h2 style={{
              color: '#ff69b4',
              margin: '10px 0',
            }}>Total Bookings by Month</h2>
            {filteredMonthlyData.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '20px',
              }}>
                {filteredMonthlyData.map(([month, count]) => (
                  <div key={month} style={{
                    backgroundColor: '#ffebcd',
                    borderRadius: '10px',
                    padding: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                  }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <strong style={{ color: '#ff69b4' }}>{month}</strong>
                    <p style={{ color: '#ff8c69' }}>Bookings: {count}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#ff69b4' }}>No bookings available for this period.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
