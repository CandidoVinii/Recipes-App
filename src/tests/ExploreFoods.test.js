import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste todos os elementos da tela de explorar comidas:', () => {
  const exploreFoodsInfo = () => {
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'teste@teste.com');
    const password = screen.getByTestId('password-input');
    userEvent.type(password, '123456789');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    const buttonExplore = screen.getByTestId('explore-bottom-btn');
    userEvent.click(buttonExplore);
    const buttonExploreFoods = screen.getByTestId('explore-foods');
    userEvent.click(buttonExploreFoods);
  };

  it(`Teste se possui três botões na tela de explorar comidas: um para explorar por 
  ingrediente, um para explorar por nacionalidade e um para pegar uma receita aleatória:`,
  () => {
    renderWithRouter(<App />);
    exploreFoodsInfo();
    const byIngredientFoods = screen.getByTestId('explore-by-ingredient');
    expect(byIngredientFoods).toBeInTheDocument();
    const byNationalityFoods = screen.getByTestId('explore-by-nationality');
    expect(byNationalityFoods).toBeInTheDocument();
    const supriseFoods = screen.getByTestId('explore-surprise');
    expect(supriseFoods).toBeInTheDocument();
  });

  it(`Teste se a pessoa usuária ao clicar em "By Ingredient", será redirecionada
  para a tela de explorar por ingredientes:`, () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodsInfo();
    const buttonByIngredientsFoods = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(buttonByIngredientsFoods);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/ingredients');
  });

  it(`Teste se a pessoa usuária ao clicar em "By Nationality", será redirecionada
  para a tela de explorar por nacionalidades:`, () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodsInfo();
    const buttonByNationalityFoods = screen.getByRole('link',
      { name: /By Nationality/i });
    userEvent.click(buttonByNationalityFoods);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/nationalities');
  });
});
