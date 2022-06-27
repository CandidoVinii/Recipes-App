import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import mockArea from '../../cypress/mocks/areas';

// const getOptions = mockArea.meals.map((item) => (
//   `${item.strArea}-option`
// ));

describe('78- Testa se foi implementado corretamente na tela de explorar ', () => {
  renderWithRouter(<App />, '/explore/foods/nationalities');
  it('Verifica se existe os data-testids de todos os 12 cards', () => {
    const buttonDropdown = screen.getByTestId('explore-by-nationality-dropdown');
    expect(buttonDropdown).toBeInTheDocument();
  });

  it('Verifica se existe os 12 cards iniciais na página expolorar : ', () => {

  });
});
