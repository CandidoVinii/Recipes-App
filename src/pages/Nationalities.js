import React from 'react';
import Header from '../componentes/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Nationalities() {
  return (
    <Header
      title="Explore Nationalities"
      searchIcon={ searchIcon }
      profileIcon={ profileIcon }
    />
  );
}

export default Nationalities;
