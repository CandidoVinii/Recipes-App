import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFoodsByCategory } from '../services/api';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipeFilterButtons from '../components/RecipeFilterButtons';
import '../styles/Home/Home.css';

const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const foodsByCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const drinksByCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

function Home({ history }) {
  const { location: { pathname } } = history;

  const defaultUrl = pathname === '/foods' ? foodsUrl : drinksUrl;

  const {
    filteredRecipes,
    setRecipesFromAPI,
    selectedCategory,
    setSelectedCategory,
  } = useContext(Context);
  const [urlToFetch, setUrlToFetch] = useState(defaultUrl);

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
      setRecipesFromAPI(Object.values(recipes)[0]);
    };
    fetchRecipes();
  }, [urlToFetch]);

  useEffect(() => {
    setSelectedCategory('All');
  }, [pathname]);

  return (
    <>
      <Header
        title={ pathname === '/foods' ? 'Foods' : 'Drinks' }
        shouldHaveSearchButton
      />
      <RecipeFilterButtons history={ history } />
      <div className="data-recipes-container">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={ `recipe-${index}` }
            props={ { index, pathname, recipe } }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

Home.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Home;
