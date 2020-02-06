import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Navigation from './components/Navigation/Navigation';
import LogIn from './components/LogIn/LogIn';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Switch>
        <Route path='/verify' component={LogIn} />
        <Route path='/' component={Registration} exact/>
      </Switch>
    </div>
  );
}

export default App;
