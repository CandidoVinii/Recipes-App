import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFoodsByCategory, setMaxNumberOfRecipes } from '../services/api';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipeFilterButtons from '../components/RecipeFilterButtons';

const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const foodsByCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const drinksByCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

function Foods({ history }) {
  const { location: { pathname } } = history;

  const defaultUrl = pathname === '/foods' ? foodsUrl : drinksUrl;
  const key = pathname === '/foods' ? 'meals' : 'drinks';
  const recipeType = pathname === '/foods' ? 'Meal' : 'Drink';

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipesFromAPI, setRecipesFromAPI] = useState([]);
  const [urlToFetch, setUrlToFetch] = useState(defaultUrl);
  const { selectedCategory } = useContext(Context);

  useEffect(() => {
    switch (selectedCategory) {
    case 'All':
      return pathname === '/foods' ? setUrlToFetch(foodsUrl) : setUrlToFetch(drinksUrl);
    default:
      return pathname === '/foods'
        ? setUrlToFetch(`${foodsByCategoryUrl}${selectedCategory}`)
        : setUrlToFetch(`${drinksByCategoryUrl}${selectedCategory}`);
    }
  }, [pathname, selectedCategory]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await fetchFoodsByCategory(urlToFetch);
      setRecipesFromAPI(recipes[key]);
    };
    fetchRecipes();
  }, [key, urlToFetch]);

  useEffect(() => {
    if (recipesFromAPI.length > 0) {
      setMaxNumberOfRecipes(recipesFromAPI, setFilteredRecipes);
    }
  }, [key, recipeType, recipesFromAPI]);

  return (
    <>
      <Header title={ pathname === '/foods' ? 'Foods' : 'Drinks' } />
      <RecipeFilterButtons history={ history } />
      <div>
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={ `recipe-${index}` }
            props={ { index, pathname, recipe, recipeType } }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Foods;
