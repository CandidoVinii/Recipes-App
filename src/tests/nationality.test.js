import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// refatorar toda tela de testes do nationality.

// o import não pode ser de uma página de teste já existente

// import mockArea from '../../cypress/mocks/areas';

// o teste não consegue ler o map feito dessa forma, procurar ler a documentação do react testing library
// const getOptions = mockArea.meals.map((item) => (
//   `${item.strArea}-option`
// ));

describe('78- Testa se foi implementado corretamente na tela de explorar ', () => {
  renderWithRouter(<App />, '/explore/foods/nationalities');
  it('Verifica se existe os data-testids de todos os 12 cards', () => {
    const buttonDropdown = screen.getByTestId('explore-by-nationality-dropdown');
    expect(buttonDropdown).toBeInTheDocument();
  });

  // pode juntar os dois it's da 72 e unificar em um unico, para que o teste não tenha vários testes fazendo somente uma tarefa
  it('Verifica se existe os 12 cards iniciais na página expolorar : ', () => {

  });
});
