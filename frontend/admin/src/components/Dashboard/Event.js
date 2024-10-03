import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const Event = () => {
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
    <div>
      <h1>Booking List</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <strong>{booking.name || 'Unnamed Booking'}</strong>
              <p>{booking.eventType || 'Unnamed Event'} - {booking.eventDate || 'No Date'}</p>
              <p>Contact: {booking.contactNumber || 'N/A'}</p>
              <p>Email: {booking.email || 'N/A'}</p>
              <p>Payment Method: {booking.paymentMethod || 'N/A'}</p>
              <p>Number of Attendees: {booking.numAttendees || 'N/A'}</p>
              {booking.notes && <p>Notes: {booking.notes}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default Event;
