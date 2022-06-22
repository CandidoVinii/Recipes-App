import React from 'react';

function RecipeFilters() {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="all"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        name="food"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="drink"
      >
        Drinks
      </button>
    </div>
  );
}

export default RecipeFilters;
