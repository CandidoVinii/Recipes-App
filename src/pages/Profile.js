import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" profileIcon={ profileIcon } />
      <Footer />
    </div>
  );
}

export default Profile;
