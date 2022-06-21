import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes/Recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:recipe-id/in-progress" />
        <Route path="/drinks/:recipe-id/in-progress" />
        <Route path="/foods/:recipe-id" />
        <Route path="/drinks/:recipe-id" />
        <Route path="/foods" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/explore/foods/ingredients" />
        <Route path="/explore/drinks/ingredients" />
        <Route path="/explore/foods" />
        <Route path="/explore/drinks" />
        <Route path="/explore/foods/nationalities" />
        <Route path="/explore" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Switch>
    </div>
  );
}

export default App;
