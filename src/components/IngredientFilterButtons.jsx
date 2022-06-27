import React from 'react';
import PropTypes from 'prop-types';

function IgredientFilterButtons({ setType }) {
  return (
    <form>
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="search-radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="search-radio"
          id="name"
          data-testid="name-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target }) => setType(target.id) }
        />
        Primeira letra
      </label>
    </form>
  );
}

IgredientFilterButtons.propTypes = {
  setType: PropTypes.func,
}.isRequired;

export default IgredientFilterButtons;
