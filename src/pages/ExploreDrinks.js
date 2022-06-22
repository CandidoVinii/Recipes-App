import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  const drinksRadom = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    if (drinks[0].idDrink) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
  };

  return (
    <>
      <Header title="Explore Drinks" profileIcon={ profileIcon } />

      <Footer />

      <Link to="/explore/drinks/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>

      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ drinksRadom }
      >
        Surprise me!
      </button>
    </>
  );
}

export default ExploreDrinks;
