import React, { useEffect } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import RecipeFilters from '../components/RecipeFilters';

function DoneRecipes() {
  useEffect(() => {
    const mock = [{
      id: 16541654,
      type: 'food',
      nationality: 'peruana',
      category: 'sobremesa',
      alcoholicOrNot: [],
      name: 'Torta de Mirtillo',
      image: profileIcon,
      doneDate: '23/05/2021',
      tags: ['gelada', 'doce'],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(mock));
  }, []);

  const completeRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <Header title="Done Recipes" profileIcon={ profileIcon } />
      <RecipeFilters />
      <Card recipes={ completeRecipes } />
    </>
  );
}

export default DoneRecipes;
