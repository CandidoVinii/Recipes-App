import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
// import Login from './pages/Login';
import Progress from './pages/Progress';
import Ingredientes from './pages/Ingredientes';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Nationalities from './pages/Nationalities';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" />
        <Route exact path="/foods/:recipe-id/in-progress" component={ Progress } />
        <Route exact path="/drinks/:recipe-id/in-progress" component={ Progress } />
        <Route exact path="/foods/:recipe-id" component={ Foods } />
        <Route exact path="/drinks/:recipe-id" component={ Drinks } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore/foods/ingredients" component={ Ingredientes } />
        <Route exact path="/explore/drinks/ingredients" component={ Ingredientes } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
