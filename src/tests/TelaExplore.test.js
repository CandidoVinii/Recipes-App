import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../pages/Explore';

describe('Teste os elementos da página tela de explorar:', () => {
  it('se tem os data-testids explore-foods e explore-drinks.', () => {
    renderWithRouter(<Explore />);
    const exploreFoods = screen.getByTestId('explore-foods');
    expect(exploreFoods).toBeInTheDocument();
    const exploreDrinks = screen.getByTestId('explore-drinks');
    expect(exploreDrinks).toBeInTheDocument();
  });

  it('Teste se a tela possui dois botões: "Explore Foods" e "Explore Drinks', () => {
    renderWithRouter(<Explore />);
    const buttonExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });
    expect(buttonExploreFoods).toBeInTheDocument();
    const buttonExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(buttonExploreDrinks).toBeInTheDocument();
  });

  it(`Teste se ao clicar em um dos botões, a pessoa usuária será redirecionada 
  para a página "Explore Foods" de comidas ou de bebidas`, () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/explore/foods');
    const buttonExploreFoods = screen.getByRole('link', { name: /Explore Foods/i });
    userEvent.click(buttonExploreFoods);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  it('Testa se redireciona a pessoa usuária para "Explore Foods"', () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/explore/drinks');
    const buttonExploreDrinks = screen.getByRole('link', { name: /Explore Drinks/i });
    userEvent.click(buttonExploreDrinks);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
