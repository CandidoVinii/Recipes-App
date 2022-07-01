import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile/Profile.css';

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
    <>
      <Header
        title="Profile"
        shouldHaveSearchButton={ false }
      />
      <div className="profile-email-container">
        <p className="profile-email" data-testid="profile-email">{user.email}</p>
      </div>
      <main className="main-content-container">
        <div className="profile-buttons-container">
          <Link to="/done-recipes">
            <button
              className="profile-button"
              type="submit"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              className="profile-button"
              type="submit"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              className="profile-button"
              type="submit"
              data-testid="profile-logout-btn"
              onClick={ handleClick }
            >
              Logout
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
