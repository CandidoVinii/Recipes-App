import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explore" profileIcon={ profileIcon } />

      <Link to="/explore/foods">
        <button
          data-testid="explore-foods"
          type="button"
        >
          Explore Foods
        </button>
      </Link>

      <Link to="/explore/drinks">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </Link>

      <Footer />
    </div>
  );
}

export default Explore;
