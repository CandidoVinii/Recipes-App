import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgressCard({ recipeArr }) {
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
              <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h1>
              <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
            </div>
            <div className="data-buttons">
              <button type="button" className="btn-fav-share" data-testid="share-btn">
                <img src={ ShareIcon } alt="Share" />
              </button>
              <button
                type="button"
                className="btn-fav-share"
                data-testid="favorite-btn btn-fav-share"
              >
                <img src={ FavoriteIcon } alt="Share" />
              </button>
            </div>
          </section>
          <section className="data-ingredients-parent">
            <h3 className="data-ingredients-title">Ingredients</h3>
            <div className="data-ingredients">
              <p>INGREDIENTE UM</p>
              <p>INGREDIENTE DOIS</p>
              <p>INGREDIENTE TRÊS</p>
              <p>INGREDIENTE QUATRO</p>
              <p>INGREDIENTE CINCO</p>
            </div>
          </section>
          <section className="data-instructions-parent">
            <div className="data-instructions" data-testid="instructions">
              {recipe.strInstructions}
            </div>
          </section>
          <section className="data-finish-recipe-btn-parent">
            <button
              type="button"
              className="data-finish-recipe-btn"
              data-testid="finish-recipe-btn"
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
  // props: PropTypes.shape().isRequired,
  recipeArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeInProgressCard;
