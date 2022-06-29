import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { apiDrinksDetails,
  apiFoodsDetails,
  getDrinks,
  getFoods,
  setMaxNumberOfRecipes } from '../services/api';

export function ContextProvider({ children }) {
  const [doneFilter, setDoneFilter] = useState('all');
  const [filterByIngredient, setFilterByIngredient] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilteredByCategory, setIsFilteredByCategory] = useState(false);
  const [isFilteredByIngredient, setIsFilteredByIngredient] = useState(false);
  const [recipesFromAPI, setRecipesFromAPI] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recomendations, setRecomendations] = React.useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedDrink, setSelectedDrink] = React.useState();

  async function getApiDrinksDetails(id, withRecomendations = false) {
    const response = await apiDrinksDetails(id);
    if (response && withRecomendations) {
      const foodsRecomendations = await getFoods();
      setRecomendations(foodsRecomendations.meals);
      setSelectedDrink(response.drinks[0]);
    }
  }

  async function getApiFoodsDetails(id, withRecomendations = false) {
    const { meals } = await apiFoodsDetails(id);
    if (meals && withRecomendations) {
      const drinksRecomendations = await getDrinks();
      setRecomendations(drinksRecomendations.drinks);
      setSelectedFood(meals[0]);
    }
  }

  const context = {
    doneFilter,
    setDoneFilter,
    filteredRecipes,
    setFilteredRecipes,
    isFilteredByCategory,
    setIsFilteredByCategory,
    isFilteredByIngredient,
    setIsFilteredByIngredient,
    recipesFromAPI,
    setRecipesFromAPI,
    recomendations,
    selectedCategory,
    setSelectedCategory,
    selectedDrink,
    selectedFood,
    getApiDrinksDetails,
    getApiFoodsDetails,
    filterByIngredient,
    setFilterByIngredient,
  };

  useEffect(() => {
    if (recipesFromAPI && recipesFromAPI.length && !isFilteredByIngredient) {
      setMaxNumberOfRecipes(recipesFromAPI, setFilteredRecipes);
    }
  }, [recipesFromAPI, isFilteredByIngredient]);

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ContextProvider;
