import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import './BookingList.css';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Format date as desired
};

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    console.log('Attempting to fetch bookings...');
    try {
      const bookingsCollection = collection(db, 'bookings');
      console.log('Collection path:', bookingsCollection.path);
      
      const snapshot = await getDocs(bookingsCollection);
      console.log(`Number of bookings found: ${snapshot.size}`);

      if (snapshot.empty) {
        console.log('No bookings found');
        return [];
      }

      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Fetched bookings:', bookingsData);
      return bookingsData;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(`Failed to fetch bookings: ${error.message || 'Please try again later.'}`);
      throw error;
    }
  };

  useEffect(() => {
    const getBookings = async () => {
      console.log('Getting bookings...');
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

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-list">
      <h1>Booking List</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <strong>{booking.name || 'Unnamed Booking'}</strong>
              <p>{booking.eventType || 'Unnamed Event'} - {formatTimestamp(booking.eventDate)}</p>
              <p>Contact: {booking.contactNumber || 'N/A'}</p>
              <p>Email: {booking.email || 'N/A'}</p>
              <p>Payment Method: {booking.paymentMethod || 'N/A'}</p>
              <p>Number of Attendees: {booking.numAttendees || 'N/A'}</p>
              <p>Scanned Count: {booking.scannedCount || '0'}</p>
              {booking.notes && <p>Notes: {booking.notes}</p>}
              {booking.qrCode && (
                <div>
                  <p>QR Code:</p>
                  <p>{booking.qrCode}</p> {/* Display the QR code as text */}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingList;
