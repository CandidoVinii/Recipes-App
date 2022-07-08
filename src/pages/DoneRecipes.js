import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import DoneFilters from '../components/DoneFilters';

function DoneRecipes() {
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
