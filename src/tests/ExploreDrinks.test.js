import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste todos os elementos da tela de explorar bebidas:', () => {
  const exploreDrinksInfo = () => {
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'teste@teste.com');
    const password = screen.getByTestId('password-input');
    userEvent.type(password, '123456789');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    const buttonExplore = screen.getByTestId('explore-bottom-btn');
    userEvent.click(buttonExplore);
    const buttonExploreDrinks = screen.getByTestId('explore-drinks');
    userEvent.click(buttonExploreDrinks);
  };

  it(`Teste se possui dois botões na tela de explorar bebidas: um para explorar por
  ingrediente e um para pegar uma receita aleatória:`, () => {
    renderWithRouter(<App />);
    exploreDrinksInfo();
    const byIngredientDrinks = screen.getByTestId('explore-by-ingredient');
    expect(byIngredientDrinks).toBeInTheDocument();
    const supriseDrinks = screen.getByTestId('explore-surprise');
    expect(supriseDrinks).toBeInTheDocument();
  });

  it(`Teste se a pessoa usuária ao clicar em "By Ingredient", será redirecionada
  para a tela de explorar por ingredientes:`, () => {
    const { history } = renderWithRouter(<App />);
    exploreDrinksInfo();
    const buttonByIngredientDrinks = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(buttonByIngredientDrinks);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
});
