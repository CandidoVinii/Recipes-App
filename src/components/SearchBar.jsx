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

function SearchBar() {
  const history = useHistory();
  const { location } = history;

  const magic = 12;
  const [valueInput, setValueInput] = useState('');
  const [typeSearch, setType] = useState('');
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);

  const firstletter = async () => {
    if (valueInput.length > 1 && typeSearch === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else if (location.pathname === '/foods') {
      const result = await serachForFirstLetter(valueInput);
      setFood(result);
    } else {
      const result = await drinkForFirstLetter(valueInput);
      setDrink(result);
    }
  };

  const handleClickMeals = async () => {
    if (typeSearch === 'ingredient') {
      const result = await searchForIngredient(valueInput);
      setFood(result);
    } else if (typeSearch === 'name') {
      const result = await searchForName(valueInput);
      setFood(await result);
    }
    firstletter();
  };

  const handleClickCocktails = async () => {
    if (typeSearch === 'ingredient') {
      const result = await searchCocktailForIngre(valueInput);
      setDrink(await result);
    } else if (typeSearch === 'name') {
      const result = await drinkForName(valueInput);
      setDrink(result);
    }
    firstletter();
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setValueInput(target.value) }
      />
      <form>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            type="radio"
            name="search-radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            name="search-radio"
            id="name"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            type="radio"
            name="search-radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={
            location.pathname === '/foods' ? handleClickMeals : handleClickCocktails
          }
        >
          Search
        </button>
      </form>
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
              <p>{item.strArea}</p>
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
