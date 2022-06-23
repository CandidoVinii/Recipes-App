import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import mealIcon from '../images/mealIcon.svg';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function Card({ recipes }) {
  const { doneFilter } = useContext(Context);
  if (doneFilter !== 'all') {
    recipes = recipes.filter((recipe) => recipe.type === doneFilter);
  }
  return (
    <div>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          {
            recipe.type === 'food'
              ? (
                <Link to={ `foods/${recipe.id}` }>
                  <img
                    src={ mealIcon }
                    alt="mealImage"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              )
              : (
                <Link to={ `drinks/${recipe.id}` }>
                  <img
                    src={ mealIcon }
                    alt="mealImage"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              )
          }
          <span>{ recipe.nationality }</span>
          <span> - </span>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </span>
          {
            recipe.type === 'food'
              ? (
                <Link to={ `foods/${recipe.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </h4>
                </Link>
              )
              : (
                <Link to={ `drinks/${recipe.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </h4>
                </Link>
              )
          }
          <span>Done in: </span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</span>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          { recipe.tags.map((tag, indice) => (
            <div key={ indice }>
              <span data-testid={ `${index}-${recipe.tags[indice]}-horizontal-tag` }>
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
