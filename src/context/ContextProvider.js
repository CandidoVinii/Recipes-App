import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { setMaxNumberOfRecipes } from '../services/api';

function ContextProvider({ children }) {
  const [doneFilter, setDoneFilter] = useState('all');
  const [filterByIngredient, setFilterByIngredient] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilteredByCategory, setIsFilteredByCategory] = useState(false);
  const [recipesFromAPI, setRecipesFromAPI] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilteredByIngredient, setIsFilteredByIngredient] = useState(false);

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
    filterByIngredient,
    setFilterByIngredient,
    isFilteredByIngredient,
    setIsFilteredByIngredient,
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
