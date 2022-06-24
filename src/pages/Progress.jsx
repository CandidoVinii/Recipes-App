import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeInProgressCard from '../components/RecipeInProgressCard';
import '../styles/Progress.css';

const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export default function Progress() {
  const { recipe: recipeID } = useParams();
  const location = useLocation();

  const [recipe, setRecipe] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    let { pathname } = { ...location };
    pathname = pathname.split('/');
    const type = `/${pathname[1]}`;
    const urlToFetch = type === '/foods' ? foodsUrl : drinksUrl;
    setUrl(urlToFetch);
  }, [location]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`${url}${recipeID}`);
      const result = await response.json();
      setRecipe(Object.values(result)[0]);
    };
    if (url) {
      fetchRecipeDetails();
    }
  }, [recipeID, url]);

  return (
    <RecipeInProgressCard recipeArr={ recipe } />
  );
}
