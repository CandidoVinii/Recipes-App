import React from 'react';
import { useParams } from 'react-router-dom';
import CardRecipe from '../../components/CardRecipe/CardRecipe';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';
import RecomendationsCarrousel from
'../../components/RecomendationsCarrousel/RecomendationsCarrousel';
import { useContextProvider } from '../../context/ContextProvider';

import './FoodDetails.css';

export default function FoodDetails() {
  const { selectedFood, recomendations, getApiFoodsDetails } = useContextProvider();
  const { id } = useParams();
  const maxLength = 6;
  React.useEffect(() => {
    getApiFoodsDetails(id, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredientsAndMeasures = () => {
    const foodKeys = Object.keys(selectedFood);
    const ingredients = foodKeys.map((key) => {
      if (key.includes('strIngredient') && selectedFood[key]) {
        return {
          name: selectedFood[key],
          measure: selectedFood[key.replace('Ingredient', 'Measure')],
        };
      }
      return null;
    });
    return ingredients.filter((object) => object !== null);
  };
  return (
    <div className="food-details">
      {selectedFood
      && <RecipeDetail
        id={ selectedFood.idMeal }
        isFood
        image={ selectedFood.strMealThumb }
        title={ selectedFood.strMeal }
        nationality={ selectedFood.strArea }
        category={ selectedFood.strCategory }
        ingredients={ getIngredientsAndMeasures() }
        instructions={ selectedFood.strInstructions }
        video={ selectedFood.strYoutube }
      />}
      <RecomendationsCarrousel>
        {recomendations
        && recomendations.map((drink, index) => {
          if (index < maxLength) {
            return (<CardRecipe
              key={ drink.idDrink }
              isRecomendation
              data-testid={ `${index}-recomendation-card` }
              id={ drink.idDrink }
              index={ index }
              image={ drink.strDrinkThumb }
              name={ drink.strDrink }
            />);
          }
          return null;
        })}
      </RecomendationsCarrousel>
    </div>
  );
}
