export const startRecipe = (isFood, id, ingredients) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  if (inProgressRecipes) {
    const inProgressRecipesObject = JSON.parse(inProgressRecipes);
    if (isFood) {
      inProgressRecipesObject.meals[id] = ingredients.map(
        (ingredient) => ingredient.name,
      );
    } else {
      inProgressRecipesObject.cocktails[id] = ingredients.map(
        (ingredient) => ingredient.name,
      );
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObject));
  } else {
    const inProgressRecipesObject = { cocktails: {}, meals: {} };
    if (isFood) {
      inProgressRecipesObject.meals[id] = ingredients.map(
        (ingredient) => ingredient.name,
      );
    } else {
      inProgressRecipesObject.cocktails[id] = ingredients.map(
        (ingredient) => ingredient.name,
      );
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObject));
  }
};

export const isInProgressRecipe = (isFood, id) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  if (inProgressRecipes) {
    const inProgressRecipesObject = JSON.parse(inProgressRecipes);
    if (isFood) {
      return inProgressRecipesObject.meals[id] ? 'Continue Recipe' : 'Start Recipe';
    }
    return inProgressRecipesObject.cocktails[id] ? 'Continue Recipe' : 'Start Recipe';
  }
  return false;
};
