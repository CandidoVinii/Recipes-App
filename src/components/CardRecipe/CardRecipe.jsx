import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardRecipe.css';

function CardRecipe({ isFood, id, index, image, name, isRecomendation, ...rest }) {
  return (
    <Link
      { ...rest }
      to={ isFood ? `/foods/${id}` : `/drinks/${id}` }
      key={ id }
      className={ `
      recipe-card
      ${isRecomendation ? 'recomendation' : ''}
      ` }
    >
      <img data-testid={ `${index}-card-img` } src={ image } alt={ name } />
      <p
        data-testid={ isRecomendation
          ? `${index}-recomendation-title` : `${index}-card-name` }
      >
        {name}

      </p>
    </Link>
  );
}

CardRecipe.propTypes = {
  isFood: PropTypes.bool,
  isRecomendation: PropTypes.bool,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

CardRecipe.defaultProps = {
  isFood: false,
  isRecomendation: false,
};

export default CardRecipe;
