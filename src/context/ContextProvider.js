import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { apiDrinksDetails,
  apiFoodsDetails,
  getDrinks,
  getFoods,
  setMaxNumberOfRecipes } from '../services/api';

export function ContextProvider({ children }) {
  const [doneFilter, setDoneFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilteredByCategory, setIsFilteredByCategory] = useState(false);
  const [recipesFromAPI, setRecipesFromAPI] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recomendations, setRecomendations] = React.useState([]);
  const [selectedFood, setSelectedFood] = React.useState();
  const [selectedDrink, setSelectedDrink] = React.useState();

  async function getApiDrinksDetails(id, withRecomendations = false) {
    const response = await apiDrinksDetails(id);
    if (withRecomendations) {
      const foodsRecomendations = await getFoods();
      setRecomendations(foodsRecomendations.meals);
    }
    setSelectedDrink(response.drinks[0]);
  }

  async function getApiFoodsDetails(id, withRecomendations = false) {
    const { meals } = await apiFoodsDetails(id);
    if (withRecomendations) {
      const drinksRecomendations = await getDrinks();
      setRecomendations(drinksRecomendations.drinks);
    }
    setSelectedFood(meals[0]);
  }

  useEffect(() => {
    if (recipesFromAPI) {
      setMaxNumberOfRecipes(recipesFromAPI, setFilteredRecipes);
    }
  }, [recipesFromAPI]);

  const context = {
    doneFilter,
    setDoneFilter,
    filteredRecipes,
    setFilteredRecipes,
    isFilteredByCategory,
    setIsFilteredByCategory,
    recipesFromAPI,
    setRecipesFromAPI,
    selectedCategory,
    setSelectedCategory,
    recomendations,
    selectedFood,
    selectedDrink,
    getApiDrinksDetails,
    getApiFoodsDetails,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export const useContextProvider = () => useContext(Context);
