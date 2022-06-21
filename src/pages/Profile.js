import React from 'react';
import Header from '../componentes/Header';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <Header title="Profile" profileIcon={ profileIcon } />
    </div>
  );
}

export default Profile;
