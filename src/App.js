import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" />
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
      </Switch>
    </div>
  );
}

export default App;
