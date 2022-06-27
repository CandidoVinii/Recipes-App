import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({});

  const getToken = () => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    if (getUser !== null) {
      setUser(getUser);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header
        title="Profile"
        shouldHaveSearchButton={ false }
      />
      <div>
        <p data-testid="profile-email">{user.email}</p>
        <Link to="/done-recipes">
          <button type="submit" data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="submit"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="submit"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
