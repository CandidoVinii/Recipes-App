import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, shouldHaveSearchButton }) {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <>
      <header className="data-header-container">
        <button
          className="data-profile-button header-btn"
          data-testid="profile-top-btn"
          type="button"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
        >
          <img className="data-button-img" src={ profileIcon } alt="profileIcon" />
        </button>
        <h1 className="data-header-title" data-testid="page-title">{title}</h1>
        {shouldHaveSearchButton && (
          <button
            className="data-search-button header-btn"
            data-testid="search-top-btn"
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
            src={ searchIcon }
          >
            <img className="data-button-img" src={ searchIcon } alt="searchIcon" />
          </button>
        )}
      </header>
      {
        searchBar && (
          <SearchBar />
        )
      }
    </>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  title: PropTypes.string,
}.isRequired;

export default Header;
