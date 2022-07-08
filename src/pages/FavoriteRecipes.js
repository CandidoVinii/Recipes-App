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
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
          borderRadius: '20px',
        } }
      >
        <button
          data-testid="filter-by-all-btn"
          style={ { marginRight: '2px', padding: '6px' } }
          type="button"
          name="all"
          onClick={ () => filterClick('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          style={ { marginRight: '2px' } }
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
      { isURLcopied && <p>Link copied!</p> }
      { saveds.length > 0 && saveds.map((recipe, index) => (
        <div
          style={ { display: 'flex',
            background: '#bde0fe',
            borderRadius: '20px',
            height: '18.3rem',
            width: '80%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '10%',
            marginTop: '10px' } }
          key={ index }
        >
          <div
            style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }
          >
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                alt={ recipe.name }
                src={ recipe.image }
                style={ { height: '25vh', borderRadius: '20px' } }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div
            style={ {
              marginTop: '2px',
              background: '#cdb4db',
              width: '100%',
              height: '22vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              borderRadius: '18px',
            } }
          >
            <p
              style={ { textAlign: 'center' } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'food' ? (
                `${recipe.nationality} - ${recipe.category}`
              ) : (
                recipe.alcoholicOrNot
              ) }
            </p>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                style={ { textAlign: 'center', fontWeight: 'bold', fontSize: '25px' } }
              >
                { recipe.name }

              </p>
            </Link>
            <div
              style={ {
                display: 'flex',
                justifyContent: 'center',
              } }
            >
              <button
                type="button"
                style={ { marginRight: '5px', borderRadius: '5px' } }
                onClick={ () => {
                  const url = `http://localhost:3000/foods/${recipe.id}`;
                  const time = 1000;
                  navigator.clipboard.writeText(url);
                  setCopiedURL(true);
                  setTimeout(() => {
                    setCopiedURL(false);
                  }, time);
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
                style={ { marginRight: '5px', borderRadius: '5px' } }
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
            </div>
          </div>
        </div>
      )) }
    </>
  );
}

export default FavoriteRecipes;
