import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  drinkForFirstLetter,
  drinkForName,
  searchCocktailForIngre,
  searchForIngredient,
  searchForName,
  serachForFirstLetter }
from '../services/api';
import IgredientFilterButtons from './IngredientFilterButtons';

function SearchBar() {
  const history = useHistory();
  const { location } = history;

  const magic = 12;
  const [valueInput, setValueInput] = useState('');
  const [typeSearch, setType] = useState('');
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);

  const handleClickMeals = async () => {
    if (typeSearch === 'ingredient') {
      const result = await searchForIngredient(valueInput);
      setFood(await result);
    } if (typeSearch === 'name') {
      const result = await searchForName(valueInput);
      setFood(result);
    } if (typeSearch === 'first-letter') {
      const result = await serachForFirstLetter(typeSearch, valueInput);
      setFood(result);
    }
  };

  const handleClickCocktails = async () => {
    if (typeSearch === 'ingredient') {
      const result = await searchCocktailForIngre(valueInput);
      setDrink(await result);
    } else if (typeSearch === 'name') {
      const result = await drinkForName(valueInput);
      setDrink(result);
    } if (typeSearch === 'first-letter') {
      const result = await drinkForFirstLetter(typeSearch, valueInput);
      setFood(result);
    }
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setValueInput(target.value) }
      />
      <IgredientFilterButtons setType={ setType } />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={
          location.pathname === '/foods' ? handleClickMeals : handleClickCocktails
        }
      >
        Search
      </button>
      {
        location.pathname === '/foods' ? (
          food.length > 0 && food.slice(0, magic).map((item, index) => (
            <div
              key={ item.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                style={ { width: '150px', height: '150px' } }
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {item.strMeal}
              </h3>
              <p>{item.strGlass}</p>
            </div>
          ))
        ) : (
          drink.length > 0 && drink.slice(0, magic).map((item, index) => (
            <div
              key={ item.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                style={ { width: '150px', height: '150px' } }
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {item.strDrink}
              </h3>
              <p>{item.strGlass}</p>
            </div>
          ))
        )
      }
    </>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default SearchBar;
