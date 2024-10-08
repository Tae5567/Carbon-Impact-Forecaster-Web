import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TravelForm = () => {
    const [formData, setFormData] = useState({
        distance_km: '',
        mode_of_transport: '',
        duration_hours: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const activityId = location.state ? location.state.activityId : null; // Check for existence

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!activityId) {
            console.error('Activity ID is not available');
            return; // Prevent submission if activityId is missing
        }

        const travelData = { ...formData, activity: activityId };

        try {
            const response = await axios.post('http://localhost:8000/api/travel-activities/', travelData);
            navigate('/prediction', { state: { activityId: response.data.id } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="distance_km"
                value={formData.distance_km}
                onChange={handleChange}
                placeholder='How far did you travel (in km)?'
                required
            />
            <select
                name="mode_of_transport"
                value={formData.mode_of_transport}
                onChange={handleChange}
                required
            >
                <option value="">Mode of Transportation</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="bike">Bike</option>
                <option value="walk">Walk</option>
            </select>
            <input
                type="number"
                name="duration_hours"
                value={formData.duration_hours}
                onChange={handleChange}
                placeholder='How long did the journey take (in hours)?'
                required
            />
            <button type="submit">Next</button>
        </form>
    );
};

export default TravelForm;
