import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [saveds, setSaveds] = useState([]);
  const [isURLcopied, setCopiedURL] = useState(false);

  const getToken = () => {
    const getitens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getitens !== null) {
      setSaveds(getitens);
    }
  };

  const removeFavorite = (recipes) => {
    setSaveds(saveds.filter((saved) => saved.id !== recipes.id));
    const getitens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = getitens.filter((recipe) => recipe.id !== recipes.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  const filterClick = (type) => {
    const getitens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type !== 'all') {
      setSaveds(getitens.filter((recipe) => recipe.type === type));
    } else if (type === 'all') {
      getToken();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  console.log(saveds);

  return (
    <>
      <Header
        title="Favorite Recipes"
        shouldHaveSearchButton={ false }
      />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ () => filterClick('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="food"
          onClick={ () => filterClick('food') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ () => filterClick('drink') }
        >
          Drink
        </button>
      </div>
      { saveds.length > 0 && saveds.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <img
              alt={ recipe.name }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'food' ? (
              `${recipe.nationality} - ${recipe.category}`
            ) : (
              recipe.alcoholicOrNot
            ) }
          </p>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate }</p>
          <button
            type="button"
            onClick={ () => {
              const url = `http://localhost:3000/foods/${recipe.id}`;
              navigator.clipboard.writeText(url);
              setCopiedURL(true);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share"
              className="share-icon"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackIcon }
            onClick={ () => removeFavorite(recipe) }
          >
            <img
              src={ blackIcon }
              alt="Favorite"
              className="favorite-icon"
            />
          </button>
          { isURLcopied && <p>Link copied!</p> }
        </div>
      )) }
    </>
  );
}

export default FavoriteRecipes;
