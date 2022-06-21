import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Foods() {
  return (
    <Header title="Foods" searchIcon={ searchIcon } profileIcon={ profileIcon } />
  );
}

export default Foods;
