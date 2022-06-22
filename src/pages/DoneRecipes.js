import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import RecipeFilters from '../components/RecipeFilters';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" profileIcon={ profileIcon } />
      <RecipeFilters />
    </>
  );
}

export default DoneRecipes;
