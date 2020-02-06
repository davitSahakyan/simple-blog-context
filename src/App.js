import React from 'react';
import './App.css';
import { Link , Route, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Switch>
        <Route path='/' component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
