import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/IgredientFilterButtons.css';

function IgredientFilterButtons({ setType }) {
  return (
    <form className="data-radio-buttons">
      <label className="data-ingredient-search-radio-label" htmlFor="ingredient">
        <input
          className="data-recipe-search-radio"
          type="radio"
          name="search-radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        Ingredient
      </label>
      <label className="data-ingredient-search-radio-label" htmlFor="name">
        <input
          className="data-recipe-search-radio"
          type="radio"
          name="search-radio"
          id="name"
          data-testid="name-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        Name
      </label>
      <label className="data-ingredient-search-radio-label" htmlFor="first-letter">
        <input
          className="data-recipe-search-radio"
          type="radio"
          name="search-radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        First letter
      </label>
    </form>
  );
}

IgredientFilterButtons.propTypes = {
  setType: PropTypes.func,
}.isRequired;

export default IgredientFilterButtons;
