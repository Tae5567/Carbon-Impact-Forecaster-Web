import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/suggestions/');
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions', error);
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      <h2>Suggestions to Reduce Your Carbon Footprint</h2>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.suggestion_text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestion;
