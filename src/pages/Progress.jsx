import React, { useEffect, useState } from 'react';
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
    } return {};
  });
  const [ingredientSteps, setIngredientSteps] = useState([]);
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
    console.log('effect - set');
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const handleIngredient = (ingredient) => {
    let prevIngredients;
    const items = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (items) {
      prevIngredients = items[recipeType][recipeID];
      console.log('prevIngredients:', prevIngredients);
      const newInProgressRecipe = {
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [recipeID]: [...prevIngredients, ingredient],
        },
      };
      setInProgressRecipes(newInProgressRecipe);
    }
  };

  return (
    <RecipeInProgressCard
      recipeArr={ recipe }
      ingredientSteps={ ingredientSteps }
      handleIngredient={ handleIngredient }
      inProgressRecipes={ inProgressRecipes }
      recipeType={ recipeType }
    />
  );
}
