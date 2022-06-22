import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

  const recipeTypes = pathname === '/foods' ? 'meals' : 'drinks';
  const recipeType = pathname === '/foods' ? 'Meal' : 'Drink';

  const [urlToFetch, setUrlToFetch] = useState('');
  const [recipes, setRecipes] = useState([]);
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
    async function fetchFoods() {
      const MAX_MEALS_PER_PAGE = 12;
      const response = await fetch(urlToFetch);
      const data = await response.json();
      let newRecipes = Object.create(data);
      console.log('data', data);
      if (data[recipeTypes].length > MAX_MEALS_PER_PAGE) {
        newRecipes = newRecipes[recipeTypes].splice(0, MAX_MEALS_PER_PAGE);
        setRecipes(newRecipes);
      } else {
        newRecipes = newRecipes[recipeTypes];
        setRecipes(newRecipes);
      }
    }
    fetchFoods();
  }, [recipeTypes, selectedCategory, urlToFetch]);

  return (
    <>
      <Header title={ pathname === '/foods' ? 'Foods' : 'Drinks' } />
      <RecipeFilterButtons history={ history } />
      <div>
        {recipes.map((recipe, index) => (
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
