import React from 'react';
import PropTypes from 'prop-types';

function Card({ recipes }) {
  return (
    <div>
      <h1>{ recipes.type }</h1>
    </div>
  );
}

Card.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default Card;
