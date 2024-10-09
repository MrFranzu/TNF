import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  const toggleExpand = (id) => {
    setExpandedBookingId(expandedBookingId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#ffe4e1', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffb6c1' }}>Booking List</h1>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : bookings.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', width: '100%', maxWidth: '1200px' }}>
          {bookings.map(booking => (
            <div 
              key={booking.id} 
              onClick={() => toggleExpand(booking.id)} 
              style={{ 
                backgroundColor: '#ffe4b5', 
                borderRadius: '10px', 
                padding: '15px', 
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <strong>{booking.name || 'Unnamed Booking'}</strong>
              <p>{booking.eventType || 'Unnamed Event'} - {formatTimestamp(booking.eventDate)}</p>
              <p>Contact: {booking.contactNumber || 'N/A'}</p>
              <p>Email: {booking.email || 'N/A'}</p>
              <p>Payment Method: {booking.paymentMethod || 'N/A'}</p>
              <p>Number of Attendees: {booking.numAttendees || 'N/A'}</p>
              <p>Scanned Count: {booking.scannedCount || '0'}</p>
              {expandedBookingId === booking.id && (
                <div style={{ marginTop: '10px', backgroundColor: '#fff0f5', borderRadius: '8px', padding: '10px' }}>
                  {booking.notes && <p>Notes: {booking.notes}</p>}
                  {booking.qrCode && (
                    <div>
                      <p>QR Code:</p>
                      <p>{booking.qrCode}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingList;
