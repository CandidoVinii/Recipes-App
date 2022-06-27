export const saveTokenInStorage = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  const user = JSON.stringify({
    email,
  });
  localStorage.setItem('user', user);
};

export default saveTokenInStorage;
export const fetchFoodsByCategory = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const setMaxNumberOfRecipes = (allRecipes, setFilteredRecipes) => {
  const MAX_MEALS_PER_PAGE = 12;
  let recipes = Array.from(allRecipes);
  if (recipes.length > MAX_MEALS_PER_PAGE) {
    recipes = recipes.slice(0, MAX_MEALS_PER_PAGE);
    setFilteredRecipes(recipes);
  } else {
    setFilteredRecipes(recipes);
  }
};

export const addFavorites = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newFavorites = [...favorites, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const removeFavorites = (id) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newFavorites = favorites.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favorites;
};

export const apiDrinksDetails = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const apiFoodsDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getDrinksCategory = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getFoodsCategory = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = response.json();
  return data;
};
