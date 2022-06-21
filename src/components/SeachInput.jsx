import React, { useState } from 'react';

function SearchInput() {
  const [valueInput, setValueInput] = useState('');
  const [typeSearch, setType] = useState('');
  const [data, setData] = useState([]);

  const handleClick = async () => {
    if (typeSearch === 'ingredient') {
      const fetchForIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`);
      const result = await fetchForIngredients.json();
      setData(result);
    } if (typeSearch === 'name') {
      const fetchForName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`);
      const resultForName = await fetchForName.json();
      setData(resultForName);
    } if (typeSearch === 'first-letter') {
      if (valueInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const fetchForLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`);
        const resultForLetter = await fetchForLetter.json();
        setData(resultForLetter);
      }
    }
    console.log(data);
    console.log(typeSearch);
    console.log(valueInput);
  };

  return (
    <form>
      <input
        type="text"
        onChange={ ({ target }) => setValueInput(target.value) }
      />
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
  );
}

export default SearchInput;
