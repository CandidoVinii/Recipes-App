import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" />
        <Route path="/foods/:recipe-id/in-progress" />
        <Route path="/drinks/:recipe-id/in-progress" />
        <Route path="/foods/:recipe-id" />
        <Route path="/drinks/:recipe-id" />
        <Route exact path="/foods">
          <Footer />
        </Route>
        <Route exact path="/drinks">
          <Footer />
        </Route>
        <Route path="/explore/foods/ingredients">
          <Footer />
        </Route>
        <Route path="/explore/drinks/ingredients">
          <Footer />
        </Route>
        <Route path="/explore/foods">
          <Footer />
        </Route>
        <Route path="/explore/drinks">
          <Footer />
        </Route>
        <Route path="/explore/foods/nationalities">
          <Footer />
        </Route>
        <Route path="/explore">
          <Footer />
        </Route>
        <Route path="/profile">
          <Footer />
        </Route>
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Switch>
    </div>
  );
}

export default App;
