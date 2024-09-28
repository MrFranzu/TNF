import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './BookingTrends.css'; // Import the CSS

const BookingTrends = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/bookings');
            const labels = response.data.map(item => item.date);
            const bookings = response.data.map(item => item.count);

            setData({
                labels,
                datasets: [
                    {
                        label: 'Bookings Over Time',
                        data: bookings,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light pink
                        borderColor: 'rgba(255, 99, 132, 1)', // Darker pink
                    },
                ],
            });
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Booking Trends</h2>
            <div className="canvas-container">
                <Line data={data} />
            </div>
        </div>
    );
};

export default BookingTrends;
