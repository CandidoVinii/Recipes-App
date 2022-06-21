import React from 'react';
import Header from '../componentes/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Drinks() {
  return (
    <Header title="Drinks" searchIcon={ searchIcon } profileIcon={ profileIcon } />
  );
}

export default Drinks;
