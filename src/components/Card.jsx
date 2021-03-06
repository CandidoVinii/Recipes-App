import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/components/Card.css';

function Card({ doneRecipes, originalDoneRecipes, setDoneRecipes }) {
  const { doneFilter } = useContext(Context);

  useEffect(() => {
    let newDoneRecipes = [];
    if (doneFilter === 'all') {
      newDoneRecipes = [...originalDoneRecipes];
      setDoneRecipes(newDoneRecipes);
    } else if (doneFilter === 'food') {
      newDoneRecipes = [...originalDoneRecipes].filter(({ type }) => type === 'food');
      setDoneRecipes(newDoneRecipes);
    } else {
      newDoneRecipes = [...originalDoneRecipes].filter(({ type }) => type === 'drink');
      setDoneRecipes(newDoneRecipes);
    }
  }, [doneFilter, originalDoneRecipes]);

  function shareClick({ currentTarget }) {
    /* Utiliza-se currentTarget aqui porque o botao possui uma imagem interna, assim, quando ele e clicado, as vezes o 'target' e a imagem, outras e o botao. Porem, precisamos sempre acessar o botao porque a informacao da URL e salva nele. Daí usamos o currentTarget porque indica qual o elemento que de fato tem o tratador associado, logo usar ele permite sempre acessar o botao */
    const recipeURL = `${window.location.origin}${currentTarget.value}`;
    navigator.clipboard.writeText(recipeURL);
    toast('Link copied!');
  }

  return (
    <main className="done-recipes-container">
      { doneRecipes && doneRecipes.map((recipe, index) => (
        <div className="recipe-card" key={ index }>
          <div className="first-column">
            <Link className="link" to={ `${recipe.type}s/${recipe.id}` }>
              <img
                className="card-image"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div className="second-column">
            <div className="flex-row">
              <Link
                className="recipe-title"
                to={ `${recipe.type}s/${recipe.id}` }
              >
                <h4
                  className="flex-row"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name}
                </h4>
              </Link>
            </div>
            { recipe.tags
              .map((tag, indice) => (
                <div className="flex-row" key={ indice }>
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                </div>
              ))}
            <div className="flex-row">
              <p
                className="flex-row"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { (recipe.type === 'food')
                  ? (`${recipe.nationality} - ${recipe.category}`)
                  : (` ${recipe.alcoholicOrNot || ''}`) }
              </p>
              <div className="flex-row">
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Done in : ${recipe.doneDate}` }
                </p>
              </div>
              <button
                className="button  flex-row"
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                value={ `/${recipe.type}s/${recipe.id}` }
                onClick={ shareClick }
                src={ shareIcon }
              >
                <img
                  src={ shareIcon }
                  alt={ `Compartilhar receita de ${recipe.name}` }
                />
              </button>
            </div>
          </div>
        </div>
      )) }
      <ToastContainer />
    </main>
  );
}

Card.propTypes = {
  doneRecipes: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
}.isRequired;

export default Card;
