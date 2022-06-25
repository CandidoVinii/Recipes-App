import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgressCard({ ingredientSteps, recipeArr }) {
  const history = useHistory();
  return (
    <>
      {recipeArr.map((recipe) => (
        <main key={ recipe.strMeal || recipe.strDrink }>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid="recipe-photo"
            className="data-recipe-thumb"
            width="100%"
          />
          <section className="data-recipe-info-parent">
            <div className="data-recipe-title">
              <h1 data-testid="recipe-title">
                { recipe.strMeal || recipe.strDrink}
              </h1>
              <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
            </div>
            <div className="data-buttons">
              <button type="button" className="btn-fav-share" data-testid="share-btn">
                <img src={ ShareIcon } alt="Share" />
              </button>
              <button
                type="button"
                className="btn-fav-share"
                data-testid="favorite-btn"
              >
                <img src={ FavoriteIcon } alt="Share" />
              </button>
            </div>
          </section>
          <section className="data-ingredients-parent">
            <h3 className="data-ingredients-title">Ingredients</h3>
            <div className="data-ingredients">
              {ingredientSteps.map((step, index) => (
                <div
                  className="data-ingredient-step"
                  key={ `${index}-ingredient-step` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name={ index }
                    id={ `${index}-ingredient-step` }
                  />
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="data-instructions-parent">
            <h3 className="data-instructions-title">Instructions</h3>
            <div className="data-instructions" data-testid="instructions">
              {recipe.strInstructions}
            </div>
          </section>
          <section className="data-finish-recipe-btn-parent">
            <button
              type="button"
              className="data-finish-recipe-btn"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/done-recipes') }
            >
              finish recipe
            </button>
          </section>
        </main>
      ))}
    </>
  );
}

RecipeInProgressCard.propTypes = {
  ingredientSteps: PropTypes.arrayOf(PropTypes.string),
  recipeArr: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default RecipeInProgressCard;
