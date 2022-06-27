import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardIngredients({ ingredient, index }) {
  const history = useHistory();

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      {
        history.location.pathname.includes('foods') ? (
          <>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt="imagem-ingredient"
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>
              { ingredient.strIngredient }
            </p>
          </>
        ) : (
          <>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt="imagem-ingredient"
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>
              { ingredient.strIngredient1 }
            </p>
          </>
        )
      }
    </div>
  );
}

CardIngredients.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.string,
}.isRequired;

export default CardIngredients;
