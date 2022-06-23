import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();

  const foodRadom = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await response.json();
    if (meals[0].idMeal) {
      return history.push(`/foods/${meals[0].idMeal}`);
    }
  };

  return (
    <>
      <Header
        title="Explore Foods"
        shouldHaveSearchButton={ false }
      />

      <Footer />

      <Link to="/explore/foods/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>

      <Link to="/explore/foods/nationalities">
        <button
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
        </button>
      </Link>

      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ foodRadom }
      >
        Surprise me!
      </button>
    </>
  );
}

export default ExploreFoods;
