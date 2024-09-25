import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [numAttendees, setNumAttendees] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventTheme, setEventTheme] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [menuPackage, setMenuPackage] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 11) {
      setContactNumber(numericValue);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (contactNumber.length !== 11) {
      alert('Please enter exactly 11 digits for the contact number.');
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDone = () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const bookingData = {
      name,
      contactNumber,
      email,
      paymentMethod,
      numAttendees,
      eventType,
      eventTheme,
      eventDate,
      menuPackage,
      notes,
    };

    setLoading(true);
    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsBooked(true);
        resetForm();
      })
      .catch((err) => {
        console.error(err);
        alert('There was an error creating your booking. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setName('');
    setContactNumber('');
    setEmail('');
    setPaymentMethod('');
    setNumAttendees('');
    setEventType('');
    setEventTheme('');
    setEventDate('');
    setMenuPackage('');
    setNotes('');
    setStep(1);
  };

  const renderSummary = () => {
    return (
      <div className="summary">
        <h2>Summary</h2>
        <div className="summary-item"><strong>Name:</strong> {name}</div>
        <div className="summary-item"><strong>Contact Number:</strong> {contactNumber}</div>
        <div className="summary-item"><strong>Email:</strong> {email}</div>
        <div className="summary-item"><strong>Payment Method:</strong> {paymentMethod}</div>
        <div className="summary-item"><strong>Number of Attendees:</strong> {numAttendees}</div>
        <div className="summary-item"><strong>Event Type:</strong> {eventType}</div>
        <div className="summary-item"><strong>Event Theme:</strong> {eventTheme}</div>
        <div className="summary-item"><strong>Event Date:</strong> {eventDate}</div>
        <div className="summary-item"><strong>Menu Package:</strong> {menuPackage}</div>
        <div className="summary-item"><strong>Notes:</strong> {notes}</div>
        <div className="button-container">
          {loading ? <p>Loading...</p> : <button type="button" onClick={handleDone}>Confirm</button>}
        </div>
      </div>
    );
  };

  const eventTypes = [
    { id: 'catering', label: 'Catering' },
    { id: 'event-center', label: 'Event Center' },
  ];

  return (
    <div className="booking-form">
      {!isBooked ? (
        <>
          <h1>Welcome!</h1>
          <p className="booking-intro">Book Your Event Now!</p>
          {step === 1 ? (
            <form onSubmit={handleNext}>
              <div className="box-container">
                <h2>Personal Information</h2>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Your 11-digit Contact Number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                  required
                  maxLength="11"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="gcash">Gcash</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
                <input
                  type="number"
                  id="numAttendees"
                  name="numAttendees"
                  placeholder="Number of Attendees"
                  value={numAttendees}
                  onChange={(e) => setNumAttendees(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <button type="submit">Next</button>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handleNext}>
              <div className="box-container">
                <h2>Event Type</h2>
                <div className="radio-group">
                  {eventTypes.map((event) => (
                    <label
                      htmlFor={event.id}
                      key={event.id}
                      className={eventType === event.label ? 'active' : ''}
                    >
                      <input
                        type="radio"
                        id={event.id}
                        name="eventType"
                        value={event.label}
                        checked={eventType === event.label}
                        onChange={(e) => setEventType(e.target.value)}
                        required
                      />
                      {event.label}
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  id="eventTheme"
                  name="eventTheme"
                  placeholder="Event Theme"
                  value={eventTheme}
                  onChange={(e) => setEventTheme(e.target.value)}
                  required
                />
                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
                <label htmlFor="menuPackage">Menu Package</label>
                <input
                  type="text"
                  id="menuPackage"
                  name="menuPackage"
                  placeholder="Menu Package"
                  value={menuPackage}
                  onChange={(e) => setMenuPackage(e.target.value)}
                  required
                />
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button type="button" className="small-button" onClick={handlePrevious}>Previous</button>
                <button type="submit">Next</button>
              </div>
            </form>
          ) : (
            renderSummary() // Render the summary
          )}
        </>
      ) : (
        <div className="booking-confirmation">
          <div className="confirmation-circle">
            <h2>You are now Booked!</h2>
            <p>The admin will notify you once they reviewed your request.</p>
            <p>Please check your email for updates.</p>
            <p>Thank you for choosing TNF Event Center!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
