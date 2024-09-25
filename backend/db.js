const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TNF_bookings',
  password: 'password',
  port: 5432,
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact_number VARCHAR(11) NOT NULL,
      email VARCHAR(255) NOT NULL,
      payment_method VARCHAR(255) NOT NULL,
      num_attendees INTEGER NOT NULL,
      event_type VARCHAR(255) NOT NULL,
      event_theme VARCHAR(255) NOT NULL,
      event_date DATE NOT NULL,
      menu_package VARCHAR(255) NOT NULL,
      notes TEXT
    );
  `;
  await pool.query(query);
};

createTable().then(() => {
  console.log('Table created successfully!');
}).catch((err) => {
  console.error(err);
});