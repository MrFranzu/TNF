const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.post('/bookings', async (req, res) => {
  const {
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
  } = req.body;

  const query = {
    text: `
      INSERT INTO bookings (
        name,
        contact_number,
        email,
        payment_method,
        num_attendees,
        event_type,
        event_theme,
        event_date,
        menu_package,
        notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `,
    values: [
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
    ],
  };

  try {
    const result = await pool.query(query);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating booking' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});