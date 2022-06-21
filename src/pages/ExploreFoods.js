import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods" profileIcon={ profileIcon } />
      <Footer />
    </>
  );
}

export default ExploreFoods;
