import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home/RecipeCard.css';
import '../styles/Home/Home.css';
import '../styles/Explore/Nationalities.css';

function Nationalities() {
  const [options, setOptions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAll] = useState([]);
  const magic = 12;

  const searchForCategory = async (value) => {
    console.log(value);
    if (value === 'All') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes(await data.meals);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const data = await response.json();
      setRecipes(await data.meals);
    }
  };

  const handleClick = ({ target }) => {
    const category = target.value;
    searchForCategory(category);
  };

  useEffect(() => {
    async function fetchNacionalities() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const responseRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const dataRecipes = await responseRecipes.json();
      setOptions(await data.meals);
      setAll(dataRecipes.meals);
    }
    fetchNacionalities();
  }, []);

  return (
    <>
      <Header
        title="Explore Nationalities"
        shouldHaveSearchButton
      />
      <section className="nationality-select-section">
        <select
          className="nationality-select"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleClick }
        >
          <option data-testid="All-option" value="All">All</option>
          {options
          && options.map((item) => (
            <option
              key={ item.strArea }
              value={ item.strArea }
              data-testid={ `${item.strArea}-option` }
            >
              {item.strArea}
            </option>))}
        </select>
      </section>
      <main className="data-recipes-container">
        {
          recipes.length === 0 && allRecipes.length > 0 ? (
            allRecipes.slice(0, magic).map((item, index) => (
              <div
                className="data-recipe-card-container"
                key={ `recipe-${index}` }
              >
                <Link
                  data-testid={ `${index}-recipe-card` }
                  to={ `/foods/${item.idMeal}` }
                >
                  <img
                    className="data-recipe-card-thumb"
                    data-testid={ `${index}-card-img` }
                    src={ item.strMealThumb }
                    alt={ item.strIdMeal }
                  />
                  <p
                    className="data-recipe-card-title"
                    data-testid={ `${index}-card-name` }
                  >
                    { item.strMeal }
                  </p>
                </Link>
              </div>
            ))
          ) : (
            recipes.slice(0, magic).map((elemen, i) => (
              <div
                className="data-recipe-card-container"
                key={ `recipe-${i}` }
              >
                <Link
                  data-testid={ `${i}-recipe-card` }
                  to={ `/${elemen.idMeal}` }
                >
                  <img
                    className="data-recipe-card-thumb"
                    data-testid={ `${i}-card-img` }
                    src={ elemen.strMealThumb }
                    alt={ elemen.strIdMeal }
                    width="100px"
                  />
                  <p
                    className="data-recipe-card-title"
                    data-testid={ `${i}-card-name` }
                  >
                    { elemen.strMeal }
                  </p>
                </Link>
              </div>
            ))
          )
        }
      </main>
      <Footer />
    </>
  );
}

export default Nationalities;
