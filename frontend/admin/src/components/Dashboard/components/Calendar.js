import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Calendar from 'react-calendar';
import './Calendar.css';

const EventCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    try {
      const bookingsCollection = collection(db, 'bookings');
      const snapshot = await getDocs(bookingsCollection);
      if (snapshot.empty) {
        console.log('No bookings found');
        return [];
      }

      return snapshot.docs.map(doc => {
        const data = doc.data();
        let eventDate = data.eventDate;

        // Check if eventDate is a Firestore Timestamp and convert it to Date
        if (eventDate && eventDate.toDate) {
          eventDate = eventDate.toDate(); // Convert to Date if it's a Timestamp
        } else if (typeof eventDate === 'string') {
          eventDate = new Date(eventDate); // Convert to Date if it's a string
        } else {
          eventDate = null; // Set to null if it's not available
        }

        return {
          id: doc.id,
          ...data,
          eventDate, // Use the converted or null value
        };
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(`Failed to fetch bookings: ${error.message || 'Please try again later.'}`);
      return [];
    }
  };

  // Load bookings on component mount
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

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(new Date(newDate));
  };

  // Function to determine if a date has bookings
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Get the year, month, and date as a string in YYYY-MM-DD format
      const formattedDate = new Date(date);
      // Set to the previous day
      formattedDate.setDate(formattedDate.getDate() + 1);
      
      const formattedDateString = formattedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      return bookings.some(event => {
        const eventDate = event.eventDate;
        // If eventDate is null, skip
        if (!eventDate) return false;
        
        // Use the same YYYY-MM-DD format for eventDate
        const eventFormattedDate = eventDate.toISOString().split('T')[0];
        return eventFormattedDate === formattedDateString; // Compare formatted dates
      }) ? 'booked-date' : null; // Return the class if booked
    }
    return null;
  };

  // Render loading or error states
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter events for the selected date using date parts for comparison
  const eventsForSelectedDate = bookings.filter(event => {
    const eventDate = event.eventDate;
    if (!eventDate) return false;

    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });

  return (
    <div className="container">
      <h1 className="title">Event Calendar</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={tileClassName} // Apply the tileClassName function
          className="calendar"
        />
      </div>
      <h2 className="events-title">Events on {date.toDateString()}:</h2>
      {eventsForSelectedDate.length > 0 ? (
        <ul className="events-list">
          {eventsForSelectedDate.map(event => {
            const eventDate = event.eventDate; // This is a Date object
            return (
              <li key={event.id} className="event-item">
                <strong className="event-name">{event.name || 'Unnamed Event'}</strong>
                <p className="event-details">{event.eventType || 'Unnamed Type'} - {eventDate.toDateString()}</p>
                <p className="event-contact">Contact: {event.contactNumber || 'N/A'}</p>
                <p className="event-email">Email: {event.email || 'N/A'}</p>
                <p className="event-payment">Payment Method: {event.paymentMethod || 'N/A'}</p>
                <p className="event-attendees">Number of Attendees: {event.numAttendees || 'N/A'}</p>
                <p className="event-scanned">Scanned Count: {event.scannedCount || '0'}</p>
                {event.notes && <p className="event-notes">Notes: {event.notes}</p>}
                {event.qrCode && <p className="event-qr">QR Code: {event.qrCode}</p>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No events for this date.</p>
      )}
    </div>
  );
};

export default EventCalendar;
