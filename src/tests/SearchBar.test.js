import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const newLocal = 'search-top-btn';
describe('Testing SearchBar, requisito 13: ', () => {
  it('Verifica se existe o dataTestId no input Ingredient:', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const searchIcon = screen.getByTestId(newLocal);
    userEvent.click(searchIcon);
    const inputI = screen.getByTestId('ingredient-search-radio');
    expect(inputI).toBeInTheDocument();
  });
  it('Verifica se existe o dataTestId no input name:', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const searchIcon = screen.getByTestId(newLocal);
    userEvent.click(searchIcon);
    const input2 = screen.getByTestId('name-search-radio');
    expect(input2).toBeInTheDocument();
  });
  it('Verifica se existe o dataTestId no input first-letter: ', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const searchIcon = screen.getByTestId(newLocal);
    userEvent.click(searchIcon);
    const input3 = screen.getByTestId('first-letter-search-radio');
    expect(input3).toBeInTheDocument();
  });
});
