import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [category, setCategory] = useState('');
  const context = {
    category,
    setCategory,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node(),
}.isRequired;

export default ContextProvider;
