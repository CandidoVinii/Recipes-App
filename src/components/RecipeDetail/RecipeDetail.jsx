import React from 'react';
import PropTypes from 'prop-types';

import './RecipeDetails.css';
import { useHistory } from 'react-router-dom';
import { isInProgressRecipe, startRecipe } from '../../utils/localStorage';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { addFavorites, getFavorites, removeFavorites } from '../../services/api';

function RecipeDetail({
  id,
  isFood,
  image,
  title,
  category,
  ingredients,
  instructions,
  video,
  nationality,
  alcoholicOrNot,
}) {
  const VIDEO_ASPECT_RATIO = {
    width: 0.9,
    height: 0.50625,
  };
  const history = useHistory();
  const [copiedRecipe, setCopiedRecipe] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const onStartRecipe = () => {
    startRecipe(isFood, id, ingredients);
    history.push(`${isFood ? '/foods' : '/drinks'}/${id}/in-progress`);
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    setCopiedRecipe(true);
    const TWO_SECONDS = 2000;
    const interval = setInterval(() => {
      setCopiedRecipe(false);
      clearInterval(interval);
    }, TWO_SECONDS);
  }

  const handleFavorite = () => {
    if (favorite) {
      setFavorite(false);
      removeFavorites(id);
    } else {
      setFavorite(true);
      addFavorites({ id,
        type: isFood ? 'food' : 'drink',
        nationality,
        category,
        alcoholicOrNot,
        name: title,
        image,
      });
    }
  };
  const favIcon = favorite ? blackHeartIcon : whiteHeartIcon;
  React.useEffect(() => {
    const favorites = getFavorites() || [];
    favorites.forEach((item) => {
      if (item.id === id) setFavorite(true);
    });
  }, [id]);

  return (
    <div className="recipe-details-container">
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
      />
      <section className="recipe-info-container">
        <header className="recipe-title">
          <h1 data-testid="recipe-title">{title}</h1>
          <h4 data-testid="recipe-category">{category}</h4>
        </header>
        <div className="buttons-container">
          <button
            className="buttons"
            onClick={ copyToClipboard }
            data-testid="share-btn"
            type="button"
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            className="buttons"
            onClick={ handleFavorite }
            data-testid="favorite-btn"
            type="button"
            src={ favIcon }
          >
            <img src={ favIcon } alt="" />
          </button>
        </div>
      </section>
      {copiedRecipe && <p>Link copied!</p>}

      {/* <span data-testid="recipe-category">{category}</span> */}
      <span data-testid="recipe-category">{alcoholicOrNot}</span>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient.name} ${ingredient.measure}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {video
      && <iframe
        className="recipe-video"
        data-testid="video"
        width={
          parseInt(document.getElementById('root').offsetWidth, 10)
           * VIDEO_ASPECT_RATIO.width
        }
        height={
          parseInt(document.getElementById('root').offsetWidth, 10)
           * VIDEO_ASPECT_RATIO.height
        }
        src={ video.replace('watch?v=', 'embed/') }
        title={ title }
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
      />}
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ onStartRecipe }
      >
        {isInProgressRecipe(isFood, id)}
      </button>
    </div>
  );
}

RecipeDetail.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  isFood: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
  })).isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string,
};

RecipeDetail.defaultProps = {
  video: null,
  isFood: false,
  alcoholicOrNot: '',
  nationality: '',
};

export default RecipeDetail;
