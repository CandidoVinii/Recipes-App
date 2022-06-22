import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [info, setInfo] = useState('');

  const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setInfo(userInfo);
  };

  useEffect(() => {
    getToken();
  }, [setInfo]);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" profileIcon={ profileIcon } />
      <div>
        <p data-testid="profile-email">{info.email}</p>
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
        <Link exact to="/">
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
