import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [doneFilter, setDoneFilter] = useState('all');
  const [isFilteredByCategory, setIsFilteredByCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const context = {
    doneFilter,
    setDoneFilter,
    isFilteredByCategory,
    setIsFilteredByCategory,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ContextProvider;
