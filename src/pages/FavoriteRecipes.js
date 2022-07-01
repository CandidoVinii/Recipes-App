import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [saveds, setSaveds] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isURLcopied, setCopiedURL] = useState(false);
  const [isFavorite, setFavorite] = useState(true);

  const getToken = () => {
    const getitens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getitens !== null) {
      setSaveds(getitens);
    }
  };
  const filterClick = ({ target }) => {
    setFilter(target.name);
    if (filter !== 'all') {
      const Arra = saveds.filter((item) => item.type === filter);
      setSaveds(Arra);
    } else if (filter === 'all') {
      getToken();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  console.log(filter);
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
          onClick={ filterClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="food"
          onClick={ filterClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ filterClick }
        >
          Drink
        </button>
      </div>
      { saveds.length > 1 && saveds.map((recipe, index) => (
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
            { isURLcopied && <p>Link copied!</p> }
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ isFavorite ? blackIcon : whiteIcon }
          >
            <img
              src={ isFavorite ? blackIcon : whiteIcon }
              alt="Favorite"
              className="favorite-icon"
            />
          </button>
        </div>
      )) }
    </>
  );
}

export default FavoriteRecipes;
