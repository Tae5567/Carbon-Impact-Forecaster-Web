import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Prediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors
  const location = useLocation();
  const navigate = useNavigate();
  const activityId = location.state?.activityId; // Safely access activityId from location.state

  useEffect(() => {
    // Check if activityId is available
    if (!activityId) {
      setError('Activity ID is missing. Unable to fetch predictions.');
      setLoading(false);
      return;
    }
    
    // Fetch the prediction data using the activityId
    const fetchPrediction = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/impact-predictions/${activityId}/`);
        const data = response.data;

        // Check if prediction data exists
        if (!data || !data.predicted_carbon_footprint) {
          setError('No prediction found for the given activity.');
          setLoading(false);
          return;
        }

        // Set prediction data and stop loading
        setPrediction(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching prediction data.');
        setLoading(false);
        console.error('Error fetching prediction data!', error);
      }
    };

    fetchPrediction();
  }, [activityId]);

  const handleNextClick = () => {
    navigate('/suggestion', { state: { activityId } });
  };

  // Render loading, error, or prediction
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Your Environmental Impact</h2>
      <p>Your activities have been analyzed to calculate their environmental impact.</p>

      {loading ? (
        <p>Loading prediction data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        prediction && (
          <div>
            <p><strong>Predicted Carbon Footprint:</strong> {prediction.predicted_carbon_footprint} kg CO2</p>
            <p><strong>Predicted Energy Usage:</strong> {prediction.predicted_energy_usage} kWh</p>
          </div>
        )
      )}

      {!loading && !error && (
        <button
          onClick={handleNextClick}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Prediction;