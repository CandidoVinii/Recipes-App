export const saveTokenInStorage = (email) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  const user = JSON.stringify({
    email,
  });
  localStorage.setItem('user', user);
};

export const searchForIngredient = async (valueInput) => {
  const fetchForIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`);
  const result = await fetchForIngredients.json();
  return result.meals;
};

export const searchForName = async (valueInput) => {
  const fetchForIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`);
  const result = await fetchForIngredients.json();
  return result.meals;
};

export const serachForFirstLetter = async (typeSearch, valueInput) => {
  const fetchForLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`);
  const result = fetchForLetter;
  if (valueInput > 1 && typeSearch === 'first-letter') {
    global.alert('Your search must have only 1 (one) character');
  }
  await result.meals;
};

export const searchCocktailForIngre = async (valueInput) => {
  const fetchForIngredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valueInput}`);
  const result = await fetchForIngredients.json();
  return result.drinks;
};

export const drinkForName = async (valueInput) => {
  const fetchForName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`);
  const result = await fetchForName.json();
  return result.drinks;
};

export const drinkForFirstLetter = async (typeSearch, valueInput) => {
  const fetchForLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueInput}`);
  const result = await fetchForLetter.json();
  if (valueInput.length > 1 && typeSearch === 'first-letter') {
    global.alert('Your search must have only 1 (one) character');
  } else {
    return result.drinks;
  }
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
    recipes = recipes.splice(0, MAX_MEALS_PER_PAGE);
    setFilteredRecipes(recipes);
  } else {
    setFilteredRecipes(recipes);
  }
};
