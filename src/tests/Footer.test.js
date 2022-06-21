import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testing Footer: ', () => {
  it('1) Footer is renderized: ', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    expect(history.location.pathname).toBe('/foods');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('2) Drinks button is working: ', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    const drinkIcon = screen.getByAltText('drink icon');
    expect(drinkIcon).toBeInTheDocument();
    expect(drinkIcon.src).toMatch('drinkIcon.svg');
    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('3) Explore button is working: ', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    const exploreIcon = screen.getByAltText('explore icon');
    expect(exploreIcon).toBeInTheDocument();
    expect(exploreIcon.src).toMatch('exploreIcon.svg');
    userEvent.click(exploreIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });

  it('4) Food button is working: ', () => {
    const { history } = renderWithRouter(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const mealIcon = screen.getByAltText('meal icon');
    expect(mealIcon).toBeInTheDocument();
    expect(mealIcon.src).toMatch('mealIcon.svg');
    userEvent.click(mealIcon);
    expect(history.location.pathname).toBe('/foods');
  });
});
