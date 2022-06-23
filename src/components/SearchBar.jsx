import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import IgredientFilterButtons from './IngredientFilterButtons';

function SearchBar() {
  const firstL = 'first-letter';
  const ingredient = 'ingredient';
  const name = 'name';
  const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

  const location = useLocation();
  const { pathname } = location;

  /* esses dois estados (drinks, foods) são chamados dependendo da pesquisa
  como o zambelli comentou é melhor usarmos estados separados, caso for preciso
  eu consigo unificar o estado em um objeto de array com as chaves meals e drinks
  */
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [typeSearch, setType] = useState('');
  const [valueinput, setValueInput] = useState('');

  const handleChange = ({ target }) => {
    setValueInput(target.value);
  };

  // função que busca apartir da api de comida
  const foodSearch = async () => {
    if (typeSearch === ingredient) {
      const ingredientSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueinput}`);
      const result = await ingredientSearch.json();
      setFoods(result.meals);
    }
    if (typeSearch === name) {
      const nameSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueinput}`);
      const result = await nameSearch.json();
      setFoods(result.meals);
    }
    if (typeSearch === firstL) {
      const firstLetterSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueinput}`);
      const result = await firstLetterSearch.json();
      setFoods(result);
    }
    if (foods.length === 0) {
      global.alert(alertNoRecipes);
    }
  };

  // função que busca apartir da api de drink
  const drinkSearch = async () => {
    if (typeSearch === ingredient) {
      const ingredientEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      const ingredientSearch = await fetch(`${ingredientEndPoint}${valueinput}`);
      const data = await ingredientSearch.json();
      setDrinks(data.drinks);
    }
    if (typeSearch === name) {
      const nameEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const nameSearch = await fetch(`${nameEndPoint}${valueinput}`);
      const data = await nameSearch.json();
      setDrinks(data.drinks);
    }
    if (typeSearch === firstL) {
      const firstLetterEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
      const firstLetterSearch = await fetch(`${firstLetterEndPoint}${valueinput}`);
      const data = await firstLetterSearch.json();
      setDrinks(data);
    }
    if (drinks.length === 0) {
      global.alert(alertNoRecipes);
    }
  };

  const handleClick = () => {
    if (valueinput.length > 1 && typeSearch === firstL) {
      global.alert('Your search must have only 1 (one) character');
    } else if (pathname === '/foods') {
      foodSearch();
    } else {
      drinkSearch();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
      <IgredientFilterButtons setType={ setType } />
    </div>
  );
}

export default SearchBar;
