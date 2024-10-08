import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivityForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        activity_type: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/activities/', formData);
            const activityId = response.data.id; // Ensure this corresponds to your API response
            const activityType = formData.activity_type;

            // Navigate based on the activity type
            if (activityType === 'travel') {
                navigate('/travel', { state: { activityId } });
            } else if (activityType === 'diet') {
                navigate('/diet', { state: { activityId } });
            } else if (activityType === 'energy') {
                navigate('/energy', { state: { activityId } });
            } else {
                console.error('Invalid activity type');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='What would you like to name this activity?'
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder='Briefly describe this activity...'
                required
            />
            <select
                name="activity_type"
                value={formData.activity_type}
                onChange={handleChange}
                required
            >
                <option value="">Select Activity Type</option>
                <option value="travel">Travel</option>
                <option value="diet">Diet</option>
                <option value="energy">Energy</option>
                <option value="combined">Multiple</option>
            </select>
            <button type="submit">Next</button>
        </form>
    );
};

export default ActivityForm;