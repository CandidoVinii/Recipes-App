import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeInProgressCard from '../components/RecipeInProgressCard';
import '../styles/Progress.css';

const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export default function Progress() {
  const { recipe: recipeID } = useParams();
  const location = useLocation();

  const [inProgressRecipes, setInProgressRecipes] = useState(() => {
    const items = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (items) {
      return items;
    } return {
      cocktails: {},
      meals: {},
    };
  });
  const [ingredientSteps, setIngredientSteps] = useState([]);
  const [isRecipeFinished, setIsRecipeFinished] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let { pathname } = { ...location };
    pathname = pathname.split('/');
    const type = `/${pathname[1]}`;
    const urlToFetch = type === '/foods' ? foodsUrl : drinksUrl;
    setUrl(urlToFetch);

    const mealsOrCocktails = type === '/foods' ? 'meals' : 'cocktails';
    setRecipeType(mealsOrCocktails);
  }, [location]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`${url}${recipeID}`);
      const result = await response.json();
      setRecipe(Object.values(result)[0]);
    };
    const assembleRecipeIngredients = () => {
      const ingredients = Object.entries(recipe[0])
        .filter((prop) => prop[0].includes('strIngredient'))
        .filter((prop) => prop[1])
        .map((prop) => prop[1]);

      const measures = Object.entries(recipe[0])
        .filter((prop) => prop[0].includes('strMeasure'))
        .filter((prop) => prop[1] && prop[1] !== ' ')
        .map((prop) => prop[1]);

      const steps = ingredients
        .map((ingredient, index) => `${ingredient} - ${measures[index]}`);
      setIngredientSteps(steps);
    };
    if (url && !recipe.length) {
      fetchRecipeDetails();
    }
    if (recipe.length) {
      assembleRecipeIngredients();
    }
  }, [recipe, recipeID, url]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const checkIfRecipeIsFinished = useCallback((ingredients) => {
    const isFinished = ingredients.length === ingredientSteps.length;
    setIsRecipeFinished(isFinished);
  }, [ingredientSteps]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (items && recipeType) {
      const ingredients = items[recipeType][recipeID];
      if (ingredients) {
        checkIfRecipeIsFinished(ingredients);
      }
    }
  }, [checkIfRecipeIsFinished, recipeID, recipeType]);

  const handleIngredient = (ingredient) => {
    let prevIngredients = [];
    const items = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isRecipeSaved = items[recipeType][recipeID];
    if (!isRecipeSaved) {
      const newInProgressRecipe = {
        ...items,
        [recipeType]: {
          ...items[recipeType],
          [recipeID]: [ingredient],
        },
      };
      setInProgressRecipes(newInProgressRecipe);
    } else {
      prevIngredients = items[recipeType][recipeID];
      if (prevIngredients.includes(ingredient)) {
        prevIngredients = prevIngredients
          .filter((currIngredient) => currIngredient !== ingredient);
      } else {
        prevIngredients = [...prevIngredients, ingredient];
      }
      const newInProgressRecipe = {
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [recipeID]: [...prevIngredients],
        },
      };
      setInProgressRecipes(newInProgressRecipe);
    }
    checkIfRecipeIsFinished(prevIngredients);
  };

  return (
    <RecipeInProgressCard
      recipeArr={ recipe }
      ingredientSteps={ ingredientSteps }
      handleIngredient={ handleIngredient }
      inProgressRecipes={ inProgressRecipes }
      recipeType={ recipeType }
      isRecipeFinished={ isRecipeFinished }
    />
  );
}
