import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './CheckInPatterns.css'; // Import the CSS

const CheckInPatterns = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/checkins');
            const labels = response.data.map(item => item.time);
            const checkIns = response.data.map(item => item.count);

            setData({
                labels,
                datasets: [
                    {
                        label: 'Check-Ins by Time',
                        data: checkIns,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light pink
                        borderColor: 'rgba(255, 99, 132, 1)', // Darker pink
                        borderWidth: 1,
                    },
                ],
            });
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Check-In Patterns</h2>
            <div className="chart-container">
                <Bar data={data} />
            </div>
        </div>
    );
};

export default CheckInPatterns;
