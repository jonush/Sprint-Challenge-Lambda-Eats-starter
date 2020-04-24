import React from "react";
import { Route } from 'react-router-dom';
import Form from './Form';
import './App.css';
import Home from './Home';

const App = () => {
  return (
    <div className="main">
      <div className="header">
        <h1>Lambda Eats</h1>
      </div>

      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/pizza'>
                <Form />
      </Route>
    </div>
  );
};
export default App;
