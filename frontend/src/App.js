import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import ActivityForm from './components/ActivityForm';
import TravelForm from './components/TravelForm';
import DietForm from './components/DietForm';
import EnergyForm from './components/EnergyForm';
import Prediction from './components/Prediction';
import './App.css';


function App() {

    return (
      <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<ActivityForm />} />
          <Route path="/travel" element={<TravelForm />} />
          <Route path="/diet" element={<DietForm />} />
          <Route path="/energy" element={<EnergyForm />} />
          <Route path="/prediction" element={<Prediction />} />

        </Routes>
      </div>
    </Router>
     
    );
}

export default App;
