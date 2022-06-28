import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="data-footer-container"
    >
      <Link to="/drinks">
        <img
          className="data-footer-button-img"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>
      <Link to="/explore">
        <img
          className="data-footer-button-img"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
        />
      </Link>
      <Link to="/foods">
        <img
          className="data-footer-button-img"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
