import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Ingredientes() {
  return (
    <>
      <Header
        title="Explore Ingredients"
        shouldHaveSearchButton={ false }
      />
      <Footer />
    </>
  );
}

export default Ingredientes;
