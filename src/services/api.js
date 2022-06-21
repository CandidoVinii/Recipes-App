const saveTokenInStorage = (email) => {
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

export const serachForFirstLetter = async (valueInput) => {
  const fetchForLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`);
  const result = await fetchForLetter.json();
  return result.meals;
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

export const drinkForFirstLetter = async (valueInput) => {
  const fetchForLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valueInput}`);
  const result = await fetchForLetter.json();
  return result.drinks;
};

export default saveTokenInStorage;
