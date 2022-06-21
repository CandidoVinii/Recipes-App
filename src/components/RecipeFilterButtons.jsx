import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const foodCategoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinkCategoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function RecipeFilterButtons({ history }) {
  const { location: { pathname } } = history;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const MAX_CATEGORIES = 5;
      let response;
      if (pathname === '/foods') {
        response = await fetch(foodCategoriesUrl);
      } else if (pathname === '/drinks') {
        response = await fetch(drinkCategoriesUrl);
      }
      const data = await response.json();
      const newCategories = Object.values(data)[0].splice(0, MAX_CATEGORIES);
      setCategories(newCategories);
    }
    fetchCategories();
  }, [pathname]);

  return (
    <div>
      {
        categories.map((category) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            type="button"
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}

RecipeFilterButtons.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default RecipeFilterButtons;
