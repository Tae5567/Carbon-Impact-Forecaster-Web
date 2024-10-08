import React from "react";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header-section">
                <div className="header-content">
                    <h1> How do you impact the environment?</h1>
                </div>               
            </header>
            <section className="info-section">
                <div className="info-content">
                    <p>
                    Carbon footprints, greenhouse gases, and climate change are all interconnected. Every action we take, from the food we eat to the way we travel, has an impact on the environment. Our daily lives contribute to the overall health of our planet, and understanding our personal impact is the first step towards making more sustainable choices.
                    </p>
                    <p>
                    By analyzing our activities and their consequences, we can find ways to reduce our carbon footprint, decrease greenhouse gas emissions, and ultimately combat climate change. This not only helps preserve our natural resources but also ensures a healthier planet for future generations.
                    </p>
                    <Link to="/activity" className="cta-button">
                        Find out your impact on the environment
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;