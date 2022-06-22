import React, { useContext } from 'react';
import Context from '../context/Context';

function DoneFilters() {
  const { setDoneFilter } = useContext(Context);

  function filterClick({ target: { name } }) {
    setDoneFilter(name);
  }

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="all"
        onClick={ filterClick }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        name="food"
        onClick={ filterClick }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="drink"
        onClick={ filterClick }
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneFilters;
