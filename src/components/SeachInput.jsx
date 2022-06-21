import React, { useState } from 'react';

function SearchInput() {
  const noMagicNumber = 12;
  const [valueInput, setValueInput] = useState('');
  const [typeSearch, setType] = useState('');
  const [data, setData] = useState([]);
  const [dataSlice, setDataSlice] = useState(noMagicNumber);

  const handleClick = async () => {
    if (typeSearch === 'ingredient') {
      const fetchForIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`);
      const result = await fetchForIngredients.json();
      setData(await result.meals);
    } if (typeSearch === 'name') {
      const fetchForName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`);
      const resultForName = await fetchForName.json();
      setData(await resultForName.meals);
    } if (typeSearch === 'first-letter') {
      if (valueInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const fetchForLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`);
        const resultForLetter = await fetchForLetter.json();
        setData(await resultForLetter.meals);
      }
    } if (data.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setValueInput(target.value) }
      />
      <form>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            type="radio"
            name="search-radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            name="search-radio"
            id="name"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            type="radio"
            name="search-radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setType(target.id) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClick() }
        >
          Search
        </button>
      </form>
      {
        data.length > 0 && data.slice(0, dataSlice).map((item) => (
          <div key={ item.idMeals }>
            <img
              style={ { width: '150px', height: '150px' } }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <h3>{item.strMeal}</h3>
            <p>{item.strArea}</p>
          </div>
        ))
      }
      <button
        type="button"
        onClick={ () => {
          setDataSlice(dataSlice + 2);
        } }
      >
        Show More

      </button>
    </>
  );
}

export default SearchInput;
