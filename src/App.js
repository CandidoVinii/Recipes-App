import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:recipe-id/in-progress" />
        <Route path="/drinks/:recipe-id/in-progress" />
        <Route path="/foods/:recipe-id" />
        <Route path="/drinks/:recipe-id" />
        <Route path="/foods" />
        <Route path="/drinks" />
        <Route path="/explore/foods/ingredients" />
        <Route path="/explore/drinks/ingredients" />
        <Route path="/explore/foods" />
        <Route path="/explore/drinks" />
        <Route path="/explore/foods/nationalities" />
        <Route path="/explore" />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </BrowserRouter>
    </div>
  );
}

export default App;
