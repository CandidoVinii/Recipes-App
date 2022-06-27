import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Login from './pages/login/Login';
import Nationalities from './pages/Nationalities';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:recipe/in-progress" component={ Progress } />
        <Route path="/drinks/:recipe/in-progress" component={ Progress } />
        <Route exact path="/foods/:recipe-id" component={ Foods } />
        <Route exact path="/drinks/:recipe-id" component={ Drinks } />
        <Route exact path="/foods" component={ Home } />
        <Route exact path="/drinks" component={ Home } />
        <Route path="/explore/foods/ingredients" component={ Ingredients } />
        <Route path="/explore/drinks/ingredients" component={ Ingredients } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/explore/drinks/nationalities" component={ PageNotFound } />
        <Route exact path="/explore" component={ Explore } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
