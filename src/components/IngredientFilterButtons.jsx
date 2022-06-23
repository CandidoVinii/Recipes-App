import React from 'react';
import PropTypes from 'prop-types';

function IgredientFilterButtons({ setType }) {
  return (
    <form>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          name="search-radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="search-radio"
          id="name"
          data-testid="name-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
      </label>
    </form>
  );
}

IgredientFilterButtons.propTypes = {
  setType: PropTypes.func,
}.isRequired;

export default IgredientFilterButtons;
