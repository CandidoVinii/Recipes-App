import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import DoneFilters from '../components/DoneFilters';

function FavoriteRecipes() {
  const [saveds, setSaveds] = useState([]);

  const getToken = () => {
    const getitens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getitens !== null) {
      setSaveds(getitens);
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
      <DoneFilters />
      { saveds.length > 1 && saveds.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.type === 'food' ? mealIcon : drinkIcon }
            alt="mealImage"
            data-testid={ `${index}-horizontal-image` }
          />
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              recipe.type === 'food' ? recipe.nationality : recipe.category
            }
          </span>
          <h4 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h4>
          <button
            type="submit"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share" />
            Share
          </button>
          <button
            type="submit"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackIcon } alt="favorite" />
            Fav
          </button>
        </div>
      )) }
    </>
  );
}

export default FavoriteRecipes;
