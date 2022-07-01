import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ContextProvider } from '../../context/ContextProvider';

const renderWithContext = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <ContextProvider>
        <Router history={ history }>{component}</Router>
      </ContextProvider>,
    ),
    history,
  });
};

export default renderWithContext;
