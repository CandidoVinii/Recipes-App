import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
// import profileIcon from '../images/profileIcon.svg';
import DoneFilters from '../components/DoneFilters';
// SETUP DO MOCK - remover mock abaixo após finalização da página de progresso.
// import mockDoneRecipes from '../tests/Mocks/mockDoneRecipes';

function DoneRecipes() {
  // SETUP DO MOCK - remover linha abaixo após finalização da página de progresso.
  // localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

  const [originalDoneRecipes, setOriginalDoneRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const completeRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (completeRecipes) {
      setOriginalDoneRecipes(completeRecipes);
      setDoneRecipes(completeRecipes);
    }
  }, []);

  return (
    <>
      <Header
        title="Done Recipes"
        shouldHaveSearchButton={ false }
      />
      <DoneFilters />
      {
        doneRecipes
      && <Card
        doneRecipes={ doneRecipes }
        originalDoneRecipes={ originalDoneRecipes }
        setDoneRecipes={ setDoneRecipes }
      />
      }
    </>
  );
}

export default DoneRecipes;
