import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import mealIcon from '../images/mealIcon.svg';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import 'react-toastify/dist/ReactToastify.css';

function Card({ recipes }) {
  const { doneFilter } = useContext(Context);
  if (doneFilter !== 'all') {
    recipes = recipes.filter((recipe) => recipe.type === doneFilter);
  }

  function shareClick({ currentTarget }) {
    /* Utiliza-se currentTarget aqui porque o botao possui uma imagem interna, assim, quando ele e clicado, as vezes o 'target' e a imagem, outras e o botao. Porem, precisamos sempre acessar o botao porque a informacao da URL e salva nele. Daí usamos o currentTarget porque indica qual o elemento que de fato tem o tratador associado, logo usar ele permite sempre acessar o botao */
    const recipeURL = `${window.location.origin}${currentTarget.value}`;
    navigator.clipboard.writeText(recipeURL);
    toast('Link copied!');
  }

  return (
    <div>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <img
              src={ mealIcon }
              alt="mealImage"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <span>{ recipe.nationality }</span>
          <span> - </span>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </span>
          <Link to={ `${recipe.type}s/${recipe.id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h4>
          </Link>
          <span>Done in: </span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</span>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            value={ `/${recipe.type}s/${recipe.id}` }
            onClick={ shareClick }
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
      <ToastContainer />
    </div>
  );
}

Card.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default Card;
