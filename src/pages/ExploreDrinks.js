import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <>
      <Footer />
      <Header title="Explore Drinks" profileIcon={ profileIcon } />
    </>
  );
}

export default ExploreDrinks;
