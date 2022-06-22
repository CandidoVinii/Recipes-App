import React from 'react';
import PropTypes from 'prop-types';
import mealIcon from '../images/mealIcon.svg';

function Card({ recipes }) {
  return (
    <div>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ mealIcon }
            alt="mealImage"
            data-testid={ `${index}-horizontal-image` }
          />
          <span>{ recipe.nationality }</span>
          <span> - </span>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </span>
          <h4 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h4>
          <span>Done in: </span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</span>
          { recipe.tags.map((tag, indice) => (
            <div key={ indice }>
              <span data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>
            </div>
          )) }
        </div>
      )) }
    </div>
  );
}

Card.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default Card;
