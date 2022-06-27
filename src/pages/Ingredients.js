import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredients from '../components/CardIngredients';
import Context from '../context/Context';

const number = 12;

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const {
    setFilteredRecipes,
    setIsFilteredByIngredient,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes('foods')) {
      setFoodOrDrink('foods');
      const foodIngredients = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const { meals } = await response.json();
        setIngredients(meals.filter((_food, index) => index < number));
      };
      foodIngredients();
    }

    if (history.location.pathname.includes('drinks')) {
      setFoodOrDrink('drinks');
      const drinksIngredients = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        const { drinks } = await response.json();
        setIngredients(drinks.filter((_drink, index) => index < number));
      };
      drinksIngredients();
    }
  }, [history]);

  const fetchIngredient = async (ingredient, drinkOrFood) => {
    const url = drinkOrFood === 'drinks' ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const data = await response.json();
    const result = drinkOrFood === 'drinks' ? data.drinks : data.meals;
    setIsFilteredByIngredient(true);
    setFilteredRecipes(result.filter((_item, index) => index < number));
  };

  return (
    <>
      <Header
        title="Explore Ingredients"
        shouldHaveSearchButton={ false }
      />
      {
        ingredients.length === 0 ? <span>Loading...</span> : (
          ingredients.map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              onClick={ () => fetchIngredient(ingredient.strIngredient
                || ingredient.strIngredient1, foodOrDrink) }
            >
              <Link
                to={ `/${foodOrDrink}` }
              >
                <CardIngredients
                  ingredient={ ingredient }
                  index={ index }
                />
              </Link>
            </button>
          ))
        )
      }
      <Footer />
    </>
  );
}

export default Ingredients;
