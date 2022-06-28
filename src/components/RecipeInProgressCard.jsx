import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIconWhite from '../images/whiteHeartIcon.svg';
import FavoriteIconBlack from '../images/blackHeartIcon.svg';

function RecipeInProgressCard({
  ingredientSteps,
  inProgressRecipes,
  isRecipeFinished,
  handleIngredient,
  recipeArr,
  recipeType }) {
  const history = useHistory();
  const { recipe: recipeID } = useParams();

  const [copy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState([{}]);

  const manageIngredient = (ingIndex) => {
    if (inProgressRecipes[recipeType][recipeID]) {
      const checked = inProgressRecipes[recipeType][recipeID]
        .some((ing) => ing === ingIndex);
      return checked;
    }
  };

  const copyRecipeUrl = async () => {
    await navigator.clipboard.writeText(window.location.href.split('/in')[0]);
    setCopy(true);
    const TWO_SECONDS = 2000;
    const interval = setInterval(() => {
      setCopy(false);
      clearInterval(interval);
    }, TWO_SECONDS);
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (item) {
      setFavoriteRecipe(item);
      return item[0].id === recipeID ? setIsFavorite(true) : setIsFavorite(false);
    }
  }, [recipeID]);

  const setRecipesToStorage = () => {
    const item = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipe = recipeArr[0];
    const recipeObj = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idDrink ? 'drink' : 'food',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipe.strTags || [],
    };
    if (item) {
      const newItem = [...item, recipeObj];
      localStorage.setItem('doneRecipes', JSON.stringify(newItem));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeObj]));
    }
    history.push('/done-recipes');
  };

  const favoriteRecipeHandler = () => {
    setIsFavorite(true);
    const recipe = recipeArr[0];
    if (favoriteRecipe[0].id === recipeID) {
      setFavoriteRecipe([{}]);
      setIsFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify([{}]));
    } else {
      const favoriteRecipes = [{
        id: recipeID,
        type: recipeType === 'meals' ? 'food' : 'drink',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      }];
      setFavoriteRecipe(favoriteRecipes);
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };

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
              <button
                type="button"
                className="btn-fav-share"
                data-testid="share-btn"
                onClick={ () => copyRecipeUrl() }
              >
                <img src={ ShareIcon } alt="Share" />
              </button>
              <button
                type="button"
                className="btn-fav-share"
                onClick={ favoriteRecipeHandler }
              >
                <img
                  src={ isFavorite ? FavoriteIconBlack : FavoriteIconWhite }
                  alt="Share"
                  data-testid="favorite-btn"
                />
              </button>
            </div>
          </section>
          { copy && <p>Link copied!</p>}
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
                    onChange={ () => handleIngredient(index) }
                    checked={ manageIngredient(index) }
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
              onClick={ setRecipesToStorage }
              disabled={ isRecipeFinished }
              // TODO: Tentar fazer a verificação aqui.
              // disabled={ !inProgressRecipes[recipeType][recipeID].length
              //   === ingredientSteps.length }
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
