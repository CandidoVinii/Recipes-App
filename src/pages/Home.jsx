import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeFilterButtons from '../components/RecipeFilterButtons';

const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const foodsByCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const drinksByCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

function Foods({ history }) {
  const { location: { pathname } } = history;

  // const url = pathname === '/foods' ? foodsUrl : drinksUrl;
  // const filterByCategoryUrl = pathname === '/foods'
  //   ? foodsByCategoryUrl : drinksByCategoryUrl;
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
    let newRecipes;
    async function fetchFoods() {
      const MAX_MEALS_PER_PAGE = 12;
      const response = await fetch(urlToFetch);
      const data = await response.json();
      if (data[recipeTypes].length > MAX_MEALS_PER_PAGE) {
        newRecipes = data[recipeTypes].splice(0, MAX_MEALS_PER_PAGE);
        setRecipes(newRecipes);
        console.log('newRecipesGreaterThan12', newRecipes);
      } else {
        newRecipes = data[recipeTypes];
        console.log('newRecipesLesserThan12', newRecipes);
        setRecipes(newRecipes);
      }
    }
    fetchFoods();
  }, [recipeTypes, selectedCategory, urlToFetch]);

  // useEffect(() => {
  //   async function fetchFoods() {
  //     const MAX_MEALS_PER_PAGE = 12;
  //     const response = await fetch(urlToFetch);
  //     const data = await response.json();
  //     const newRecipes = data[recipeTypes].splice(0, MAX_MEALS_PER_PAGE);
  //     setRecipes(newRecipes);
  //   }
  //   function checkSelectedCategory() {
  //     if (selectedCategory === 'All') {
  //       fetchFoods();
  //     }
  //   }
  //   checkSelectedCategory();
  // }, [urlToFetch, recipeTypes, selectedCategory]);

  // useEffect(() => {
  //   async function fetchFoodsByCategory() {
  //     let newRecipes;
  //     const MAX_MEALS_PER_PAGE = 12;
  //     const response = await fetch(urlToFetch);
  //     const data = await response.json();
  //     if (data[recipeTypes].length > MAX_MEALS_PER_PAGE) {
  //       newRecipes = data[recipeTypes].splice(0, MAX_MEALS_PER_PAGE);
  //     } newRecipes = data[recipeTypes];
  //     setRecipes(newRecipes);
  //   }
  //   function checkSelectedCategory() {
  //     if (selectedCategory !== 'All') {
  //       fetchFoodsByCategory();
  //     }
  //   }
  //   checkSelectedCategory();
  // }, [recipeTypes, selectedCategory, urlToFetch]);

  return (
    <>
      <Header title={ pathname === '/foods' ? 'Foods' : 'Drinks' } />
      <RecipeFilterButtons history={ history } />
      <div>
        {
          recipes.map((recipe, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ `recipe-${index}` }>
              {recipeType === 'Meal'
                ? (
                  <Link to={ `${pathname}/${recipe.idMeal}` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strMealThumb }
                      alt={ recipe.strIdMeal }
                      width="100px"
                    />
                    <p data-testid={ `${index}-card-name` }>
                      { recipe.strMeal }
                    </p>
                  </Link>)
                : (
                  <Link to={ `${pathname}/${recipe.idDrink}` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strIdDrink }
                      width="100px"
                    />
                    <p data-testid={ `${index}-card-name` }>
                      { recipe.strDrink }
                    </p>
                  </Link>
                )}
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Foods;
