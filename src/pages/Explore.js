import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore/Explore.css';

function Explore() {
  return (
    <div>
      <Header
        title="Explore"
        shouldHaveSearchButton={ false }
      />

      <main className="main-explore-container">
        <Link to="/explore/foods">
          <button
            className="explore-button"
            data-testid="explore-foods"
            type="button"
          >
            Explore Foods
          </button>
        </Link>

        <Link to="/explore/drinks">
          <button
            className="explore-button"
            data-testid="explore-drinks"
            type="button"
          >
            Explore Drinks
          </button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default Explore;
