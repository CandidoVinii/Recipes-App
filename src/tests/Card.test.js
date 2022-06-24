import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './helpers/renderWithContext';
import App from '../App';
import mockDoneRecipes from './Mocks/mockDoneRecipes';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
});

describe('Testing component Card: ', () => {
  it('1) Text features are shown?', () => {
    const { history } = renderWithContext(<App />, targetPathname);
    expect(history.location.pathname).toBe(targetPathname);
    mockDoneRecipes.forEach((mock, index) => {
      const recipeName = screen.getByText(mock.name);
      expect(recipeName).toBeInTheDocument();
      const recipeDate = screen.getByText(`Done in : ${mock.doneDate}`);
      expect(recipeDate).toBeInTheDocument();
      const recipeNational = screen.getByText(`${mock.nationality}`);
      expect(recipeNational).toBeInTheDocument();
      const recipeShare = screen.getByTestId(`${index}-horizontal-share-btn`);
      expect(recipeShare).toBeInTheDocument();
      expect(recipeShare.value).toBe(`/${mock.type}s/${mock.id}`);
      mock.tags.forEach((tag) => {
        const recipeTag = screen.getByText(`${tag}`);
        expect(recipeTag).toBeInTheDocument();
      });
      if (mock.type === 'food') {
        const recipeCategory = screen.getByText(`- ${mock.category}`);
        expect(recipeCategory).toBeInTheDocument();
      } else {
        const recipeAlcoholic = screen.getByText(`- ${mock.alcoholicOrNot}`);
        expect(recipeAlcoholic).toBeInTheDocument();
      }
    });
  });

  it('2) Links are working? ', () => {
    const { history } = renderWithContext(<App />, targetPathname);
    expect(history.location.pathname).toBe(targetPathname);
    mockDoneRecipes.forEach((mock) => {
      const mockImage = screen.getByAltText(`${mock.name}`);
      expect(mockImage).toBeInTheDocument();
      userEvent.click(mockImage);
      expect(history.location.pathname).toBe(`/${mock.type}s/${mock.id}`);
      history.push(targetPathname);
      const mockName = screen.getByRole('heading', {
        name: `${mock.name}`,
      });
      expect(mockName).toBeInTheDocument();
      userEvent.click(mockName);
      expect(history.location.pathname).toBe(`/${mock.type}s/${mock.id}`);
      history.push(targetPathname);
    });
  });
});
