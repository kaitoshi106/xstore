import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';

import { HomePage } from "./pages";

const App = () => {
  return (
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
  ); 
};

export default App;
