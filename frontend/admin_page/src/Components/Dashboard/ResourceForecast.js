import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResourceForecast.css'; // Import the CSS

const ResourceForecast = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/resources');
            setResources(response.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Resource Forecast</h2>
            <table>
                <thead>
                    <tr>
                        <th>Event Type</th>
                        <th>Expected Attendees</th>
                        <th>Seating Required</th>
                        <th>Catering Needs</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(resource => (
                        <tr key={resource.id}>
                            <td>{resource.eventType}</td>
                            <td>{resource.expectedAttendees}</td>
                            <td>{resource.seatingRequired}</td>
                            <td>{resource.cateringNeeds}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResourceForecast;
