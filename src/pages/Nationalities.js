import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <select
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
      {
        recipes.length === 0 && allRecipes.length > 0 ? (
          allRecipes.slice(0, magic).map((item, index) => (
            <div key={ `recipe-${index}` }>
              <Link
                data-testid={ `${index}-recipe-card` }
                to={ `/foods/${item.idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt={ item.strIdMeal }
                  width="100px"
                />
                <p data-testid={ `${index}-card-name` }>
                  { item.strMeal }
                </p>
              </Link>
            </div>
          ))
        ) : (
          recipes.slice(0, magic).map((elemen, i) => (
            <div key={ `recipe-${i}` }>
              <Link
                data-testid={ `${i}-recipe-card` }
                to={ `/${elemen.idMeal}` }
              >
                <img
                  data-testid={ `${i}-card-img` }
                  src={ elemen.strMealThumb }
                  alt={ elemen.strIdMeal }
                  width="100px"
                />
                <p data-testid={ `${i}-card-name` }>
                  { elemen.strMeal }
                </p>
              </Link>
            </div>
          ))
        )
      }
      <Footer />
    </>
  );
}

export default Nationalities;
