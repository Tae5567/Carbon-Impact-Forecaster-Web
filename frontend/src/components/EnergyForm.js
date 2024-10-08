import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EnergyForm = () => {
    const [formData, setFormData] = useState({
        electricity_usage_kwh: '',
        appliances_used: '',
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
        
        const energyData = { ...formData, activity: activityId };

        try {
            const response = await axios.post('http://localhost:8000/api/energy-activities/', energyData);
            navigate('/prediction', { state: { activityId: response.data.id } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="electricity_usage_kwh"
                value={formData.electricity_usage_kwh}
                onChange={handleChange}
                placeholder='How much electricity did you use (kWh)?'
                required
            />
            <textarea
                name="appliances_used"
                value={formData.appliances_used}
                onChange={handleChange}
                placeholder='Which appliances did you use?'
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EnergyForm;