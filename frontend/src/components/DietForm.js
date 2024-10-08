import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const DietForm = () => {
    const [formData, setFormData] = useState({
        food_items: '',
        calories_consumed: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const activityId = location.state.activityId;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dietData = { ...formData, activity: activityId };

        try {
            const response = await axios.post('http://localhost:8000/api/diet-activities/', dietData);
            navigate('/prediction', { state: { activityId: response.data.id } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form  onSubmit={handleSubmit}>
            <textarea
                name="food_items"
                value={formData.food_items}
                onChange={handleChange}
                placeholder='What food items did you consume?'
                required
            />
            <input
                type="number"
                name="calories_consumed"
                value={formData.calories_consumed}
                onChange={handleChange}
                placeholder='How many calories did you consume?'
                required
            />
            <button type="submit">Next</button>
        </form>
    );
};

export default DietForm;