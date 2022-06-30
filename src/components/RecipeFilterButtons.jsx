import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import '../styles/Home/RecipeFilterButtons.css';

const foodCategoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinkCategoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function RecipeFilterButtons({ history }) {
  const { location: { pathname } } = history;

  const [categoriesList, setCategoriesList] = useState([]);
  const {
    isFilteredByCategory,
    setIsFilteredByCategory,
    selectedCategory,
    setSelectedCategory,
  } = useContext(Context);

  const selectCategoryToggle = (category) => {
    if (isFilteredByCategory && selectedCategory === category) {
      setSelectedCategory('All');
      setIsFilteredByCategory(false);
    } else {
      setSelectedCategory(category);
      setIsFilteredByCategory(true);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      const MAX_CATEGORIES = 5;
      let response;
      if (pathname.includes('/foods')) {
        response = await fetch(foodCategoriesUrl);
      } else if (pathname.includes('/drinks')) {
        response = await fetch(drinkCategoriesUrl);
      }
      const data = await response.json();
      const newCategories = Object.values(data)[0].slice(0, MAX_CATEGORIES);
      setCategoriesList(newCategories);
    }
    fetchCategories();
  }, [pathname]);

  return (
    <section className="filter-buttons-section">
      <div className="data-category-buttons-container">
        <button
          className="data-category-buttons"
          data-testid="All-category-filter"
          onClick={ () => {
            setSelectedCategory('All');
            setIsFilteredByCategory(false);
          } }
          type="button"
        >
          All
        </button>
        {
          categoriesList.map((category) => (
            <button
              className="data-category-buttons"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              onClick={ () => selectCategoryToggle(category.strCategory) }
              value={ isFilteredByCategory }
              type="button"
            >
              {category.strCategory}
            </button>
          ))
        }
      </div>
      <div className="data-selected-category-container">
        {
          selectedCategory === 'All'
            ? (
              <p className="data-selected-category">Mostrando todas as receitas</p>
            )
            : (
              <p className="data-selected-category">
                {`Mostrando receitas da categoria ${selectedCategory}`}
              </p>
            )
        }
      </div>
    </section>
  );
}

RecipeFilterButtons.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default RecipeFilterButtons;
