import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ title, profileIcon, searchIcon }) {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      {
        searchIcon && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
          </button>
        )
      }

      {
        searchBar && (
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
          />
        )
      }
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  title: PropTypes.string,
  profileIcon: PropTypes.string,
  searchIcon: PropTypes.string,
}.isRequired;

export default Header;
