export const saveTokenInStorage = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  const user = JSON.stringify({
    email,
  });
  localStorage.setItem('user', user);
};

export const fetchFoodsByCategory = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const setMaxNumberOfRecipes = (allRecipes, setFilteredRecipes) => {
  const MAX_MEALS_PER_PAGE = 12;
  let recipes = Array.from(allRecipes);
  if (recipes.length > MAX_MEALS_PER_PAGE) {
    recipes = recipes.splice(0, MAX_MEALS_PER_PAGE);
    setFilteredRecipes(recipes);
  } else {
    setFilteredRecipes(recipes);
  }
};
