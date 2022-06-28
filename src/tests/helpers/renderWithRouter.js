import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Context from '../../context/Context';

const contextDefaultValues = {
  doneFilter: '',
  setDoneFilter: () => undefined,
  filteredRecipes: [],
  setFilteredRecipes: () => undefined,
  isFilteredByCategory: false,
  setIsFilteredByCategory: () => undefined,
  recipesFromAPI: () => undefined,
  setRecipesFromAPI: () => undefined,
  selectedCategory: '',
  setSelectedCategory: () => undefined,
  recomendations: [],
  selectedFood: {},
  selectedDrink: {},
  getApiDrinksDetails: () => undefined,
  getApiFoodsDetails: () => undefined,
  filterByIngredient: [],
  setFilterByIngredient: () => undefined,
  isFilteredByIngredient: false,
  setIsFilteredByIngredient: () => undefined,
};

const renderWithRouter = (component, route = '/', contextValues) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <Context.Provider
        value={ { ...contextDefaultValues, ...contextValues } }
      >
        <Router history={ history }>
          {component}
        </Router>
      </Context.Provider>,
    ),
    history,
  });
};

export default renderWithRouter;
