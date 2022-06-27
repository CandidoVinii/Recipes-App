import React from 'react';
import { useParams } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe/CardRecipe';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';
import RecomendationsCarrousel from
'../../components/RecomendationsCarrousel/RecomendationsCarrousel';
import { useContextProvider } from '../../context/ContextProvider';

import './DrinkDetails.css';

export default function DrinkDetails() {
  const { selectedDrink, recomendations, getApiDrinksDetails } = useContextProvider();
  const { id } = useParams();
  const maxLength = 6;
  React.useEffect(() => {
    getApiDrinksDetails(id, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(recomendations);
  const getIngredientsAndMeasures = () => {
    const foodKeys = Object.keys(selectedDrink);
    console.log(foodKeys);
    const ingredients = foodKeys.map((key) => {
      if (key.includes('strIngredient') && selectedDrink[key]) {
        return {
          name: selectedDrink[key],
          measure: selectedDrink[key.replace('Ingredient', 'Measure')],
        };
      }
      return null;
    });
    return ingredients.filter((object) => object !== null);
  };

  return (
    <div className="drink-details">
      {selectedDrink
      && <RecipeDetail
        id={ selectedDrink.idDrink }
        image={ selectedDrink.strDrinkThumb }
        title={ selectedDrink.strDrink }
        alcoholicOrNot={ selectedDrink.strAlcoholic }
        category={ selectedDrink.strCategory }
        ingredients={ getIngredientsAndMeasures() }
        instructions={ selectedDrink.strInstructions }
      />}
      <RecomendationsCarrousel>
        {recomendations
        && recomendations.map((food, index) => {
          if (index < maxLength) {
            return (<CardRecipe
              isFood
              isRecomendation
              data-testid={ `${index}-recomendation-card` }
              id={ food.idMeal }
              key={ food.idMeal }
              index={ index }
              image={ food.strMealThumb }
              name={ food.strMeal }
            />);
          }
          return null;
        })}
      </RecomendationsCarrousel>
    </div>
  );
}
