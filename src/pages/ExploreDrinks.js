import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore/Explore.css';

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
      <Header
        title="Explore Drinks"
        shouldHaveSearchButton={ false }
      />

      <Footer />

      <main className="main-explore-container">
        <Link to="/explore/drinks/ingredients">
          <button
            className="explore-button"
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
        </Link>
        <button
          className="explore-button"
          data-testid="explore-surprise"
          type="button"
          onClick={ drinksRadom }
        >
          Surprise me!
        </button>
      </main>
    </>
  );
}

export default ExploreDrinks;
