import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import IgredientFilterButtons from './IngredientFilterButtons';
import '../styles/components/SearchBar.css';

function SearchBar() {
  const firstL = 'first-letter';
  const ingredient = 'ingredient';
  const name = 'name';
  const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  const [typeSearch, setType] = useState('');
  const [valueinput, setValueInput] = useState('');
  const { setRecipesFromAPI } = useContext(Context);

  const handleChange = ({ target }) => {
    setValueInput(target.value);
  };

  const search = (recipes) => {
    let onlyRecipe;
    if (recipes === null) {
      onlyRecipe = false;
    } else {
      onlyRecipe = recipes.length === 1;
    }
    if (onlyRecipe) {
      const ID = pathname === '/foods' ? 'idMeal' : 'idDrink';
      const recipeID = recipes[0][ID];
      history.push(`${pathname}/${recipeID}`);
    } else if (!recipes) {
      global.alert(alertNoRecipes);
    }
    setRecipesFromAPI(recipes);
  };

  // função que busca apartir da api de comida
  const foodSearch = async () => {
    if (typeSearch === ingredient) {
      const ingredientSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueinput}`);
      const recipes = await ingredientSearch.json();
      search(Object.values(recipes)[0]);
    }
    if (typeSearch === name) {
      const nameSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueinput}`);
      const recipes = await nameSearch.json();
      search(Object.values(recipes)[0]);
    }
    if (typeSearch === firstL) {
      const firstLetterSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueinput}`);
      const recipes = await firstLetterSearch.json();
      search(Object.values(recipes)[0]);
    }
  };

  // função que busca apartir da api de drink
  const drinkSearch = async () => {
    if (typeSearch === ingredient) {
      const ingredientEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      const ingredientSearch = await fetch(`${ingredientEndPoint}${valueinput}`);
      const recipes = await ingredientSearch.json();
      setRecipesFromAPI(Object.values(recipes)[0]);
      search(Object.values(recipes)[0]);
    }
    if (typeSearch === name) {
      const nameEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const nameSearch = await fetch(`${nameEndPoint}${valueinput}`);
      const recipes = await nameSearch.json();
      search(Object.values(recipes)[0]);
    }
    if (typeSearch === firstL) {
      const firstLetterEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
      const firstLetterSearch = await fetch(`${firstLetterEndPoint}${valueinput}`);
      const recipes = await firstLetterSearch.json();
      search(Object.values(recipes)[0]);
    }
  };

  const handleClick = async () => {
    if (valueinput.length > 1 && typeSearch === firstL) {
      global.alert('Your search must have only 1 (one) character');
    } else if (pathname === '/foods') {
      await foodSearch();
    } else {
      await drinkSearch();
    }
  };

  return (
    <section className="data-searchbar-container">
      <div className="data-search-input-container">
        <input
          className="data-search-input"
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
        />
        <button
          className="data-search-btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
      <IgredientFilterButtons setType={ setType } />
    </section>
  );
}

export default SearchBar;
