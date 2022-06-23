import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <Header
      title="Favorite Recipes"
      shouldHaveSearchButton={ false }
    />
  );
}

export default FavoriteRecipes;
