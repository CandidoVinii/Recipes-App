import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../components/Footer';

function Nationalities() {
  return (
    <>
      <Header
        title="Explore Nationalities"
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
      />
      <Footer />
    </>
  );
}

export default Nationalities;
