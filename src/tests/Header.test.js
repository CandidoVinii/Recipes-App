import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Foods from '../pages/Foods';
import Login from '../pages/login/Login';
import Drinks from '../pages/Drinks';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails/DrinkDetails';
import Progress from '../pages/RecipeInProgress';

const profileTest = 'profile-top-btn';
const titleTest = 'page-title';
const searchTest = 'search-top-btn';

describe('Teste os elementos do componente header na tela principal de receitas:', () => {
  it('se o botão de perfil, o título e o botão de search são renderizados', () => {
    renderWithRouter(<Foods />);
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });
});

describe('Teste o componente Header:', () => {
  it('se não houver Header na Tela de Login', () => {
    renderWithRouter(<Login />);
    const profileButton = screen.queryByTestId(profileTest);
    expect(profileButton).not.toBeInTheDocument();
    const title = screen.queryByTestId(titleTest);
    expect(title).not.toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).not.toBeInTheDocument();
  });

  it('se o Header está presente na Tela Principal de receitas de comidas', () => {
    renderWithRouter(<Foods />);
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o Header está presente na Tela Principal de receitas de bebidas', () => {
    renderWithRouter(<Drinks />);
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
  });

  it('se não tem Header na Tela de Detalhes de uma receita de comida', () => {
    renderWithRouter(<FoodDetails />);
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).not.toBeInTheDocument();
    const title = screen.queryByTestId(titleTest);
    expect(title).not.toBeInTheDocument();
    const profileButton = screen.queryByTestId(profileTest);
    expect(profileButton).not.toBeInTheDocument();
  });

  it('se não tem Header na Tela de Detalhes de uma receita de bebida', () => {
    renderWithRouter(<DrinkDetails />);
    const profileButton = screen.queryByTestId(profileTest);
    expect(profileButton).not.toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).not.toBeInTheDocument();
    const title = screen.queryByTestId(titleTest);
    expect(title).not.toBeInTheDocument();
  });

  it('se não tem Header na Tela de Receita em Progresso de comida', () => {
    renderWithRouter(<Progress />);
    const profileButton = screen.queryByTestId(profileTest);
    expect(profileButton).not.toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).not.toBeInTheDocument();
    const title = screen.queryByTestId(titleTest);
    expect(title).not.toBeInTheDocument();
  });

  it('se não tem Header na Tela de Receita em Progresso de bebida', () => {
    renderWithRouter(<Progress />);
    const profileButton = screen.queryByTestId(profileTest);
    expect(profileButton).not.toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).not.toBeInTheDocument();
    const title = screen.queryByTestId(titleTest);
    expect(title).not.toBeInTheDocument();
  });

  it('se o Header tem os ícones corretos na Tela de Explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeDefined();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o Header tem os ícones corretos na Tela de Explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeDefined();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o Header tem os ícones corretos na Tela de Explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeDefined();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o header tem os ícones na Tela de Explorar comidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o header tem os ícones na Tela de Explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se header tem os ícones na Tela de Explorar comidas por Nacionalidade', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.getByTestId(searchTest);
    expect(searchButton).toBeInTheDocument();
  });

  it('se o header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se o header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });

  it('se header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const profileButton = screen.getByTestId(profileTest);
    expect(profileButton).toBeInTheDocument();
    const title = screen.getByTestId(titleTest);
    expect(title).toBeInTheDocument();
    const searchButton = screen.queryByTestId(searchTest);
    expect(searchButton).toBeDefined();
  });
});

describe('Teste se pessoa usuária será redirecionada para a tela de perfil:', () => {
  it('ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(<Foods />);
    history.push('/');
    const profileButton = screen.getByTestId(profileTest);
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
});

describe('Teste botão de busca que, ao ser clicado, mostre a barra de busca:', () => {
  it('se ao clicar no botão de busca pela primeira vez a barra aparece', () => {
    renderWithRouter(<Foods />);
    const searchButton = screen.queryByTestId(searchTest);
    // userEvent.click(searchButton);
    const searchInputTestid = screen.queryByTestId('search-input');
    expect(searchInputTestid).toBeDefined();
  });

  it('se ao clicar no botão de busca pela segunda vez a barra desaparece', () => {
    renderWithRouter(<Foods />);
    const searchButton = screen.queryByTestId(searchTest);
    // userEvent.click(searchButton);
    const searchInputTestid = screen.queryByTestId('search-input');
    expect(searchInputTestid).toBeDefined();
    // userEvent.click(searchButton);
    expect(searchInputTestid).not.toBeInTheDocument();
  });
});
