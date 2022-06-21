import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Ingredientes() {
  return (
    <>
      <Header title="Explore Ingredients" profileIcon={ profileIcon } />
      <Footer />
    </>
  );
}

export default Ingredientes;
