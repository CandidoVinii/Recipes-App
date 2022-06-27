import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Home/RecipeCard.css';

function RecipeCard({ props }) {
  const { index, pathname, recipe } = props;
  const recipeType = pathname === '/foods' ? 'Meal' : 'Drink';

  return (
    <Link
      className="data-recipe-card-container"
      key={ `recipe-${index}` }
      data-testid={ `${index}-recipe-card` }
      to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }
    >
      {recipeType === 'Meal'
        ? (
          <>
            <img
              className="data-recipe-card-thumb"
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strIdMeal }
            />
            <p className="data-recipe-card-title" data-testid={ `${index}-card-name` }>
              { recipe.strMeal }
            </p>
          </>
        )
        : (
          <>
            <img
              className="data-recipe-card-thumb"
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strIdDrink }
              width="100px"
            />
            <p className="data-recipe-card-title" data-testid={ `${index}-card-name` }>
              { recipe.strDrink }
            </p>
          </>
        )}
    </Link>
  );
}

RecipeCard.propTypes = {
  props: PropTypes.shape(),
}.isRequired;

export default RecipeCard;
