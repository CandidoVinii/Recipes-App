import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeFilterButtons from '../components/RecipeFilterButtons';

const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Foods({ history }) {
  const { location: { pathname } } = history;

  const url = pathname === '/foods' ? foodsUrl : drinksUrl;
  const recipeTypes = pathname === '/foods' ? 'meals' : 'drinks';
  const recipeType = pathname === '/foods' ? 'Meal' : 'Drink';

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchFoods() {
      const MAX_MEALS_PER_PAGE = 12;
      const response = await fetch(url);
      const data = await response.json();
      const newRecipes = data[recipeTypes].splice(0, MAX_MEALS_PER_PAGE);
      setRecipes(newRecipes);
    }
    fetchFoods();
  }, [url, recipeTypes]);

  return (
    <>
      <Header title={ pathname === '/foods' ? 'Foods' : 'Drinks' } />
      <RecipeFilterButtons history={ history } />
      <div>
        {
          recipes.map((recipe, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ `recipe-${index}` }>
              {recipeType === 'Meal'
                ? (
                  <Link to={ `${pathname}/${recipe.idMeal}` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strMealThumb }
                      alt={ recipe.strIdMeal }
                      width="100px"
                    />
                    <p data-testid={ `${index}-card-name` }>
                      { recipe.strMeal }
                    </p>
                  </Link>)
                : (
                  <Link to={ `${pathname}/${recipe.idDrink}` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strIdDrink }
                      width="100px"
                    />
                    <p data-testid={ `${index}-card-name` }>
                      { recipe.strDrink }
                    </p>
                  </Link>
                )}
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Foods;
