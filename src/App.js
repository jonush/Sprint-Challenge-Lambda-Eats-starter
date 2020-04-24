import React from "react";
import { Route, Link } from 'react-router-dom';
import Form from './Form';
import Home from './Home';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/pizza'>Order</Link>
      </div>

      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/pizza'>
        <Form />
      </Route>
    </>
  );
};
export default App;
