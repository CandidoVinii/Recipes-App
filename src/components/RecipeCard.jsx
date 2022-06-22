import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ props }) {
  const { index, pathname, recipe, recipeType } = props;
  return (
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
          </Link>
        )
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
  );
}

RecipeCard.propTypes = {
  props: PropTypes.shape(),
}.isRequired;

export default RecipeCard;
