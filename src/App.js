import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration'

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path='/' component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
