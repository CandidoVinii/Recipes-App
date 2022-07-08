import React, { useContext } from 'react';
import Context from '../context/Context';
import '../styles/components/DoneFilters.css';

function DoneFilters() {
  const { setDoneFilter } = useContext(Context);

  function filterClick({ target: { name } }) {
    setDoneFilter(name);
  }

  return (
    <div className="filter-buttons-container">
      <button
        className="filter-btn"
        data-testid="filter-by-all-btn"
        type="button"
        name="all"
        onClick={ filterClick }
      >
        All
      </button>
      <button
        className="filter-btn"
        data-testid="filter-by-food-btn"
        type="button"
        name="food"
        onClick={ filterClick }
      >
        Food
      </button>
      <button
        className="filter-btn"
        data-testid="filter-by-drink-btn"
        type="button"
        name="drink"
        onClick={ filterClick }
      >
        Drink
      </button>
    </div>
  );
}

export default DoneFilters;
