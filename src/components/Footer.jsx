import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
