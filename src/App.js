import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";

import { About, ErrorPage, HomePage } from "./pages";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";


const App = () => {

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path='/products'>
          <ProductsPage />
        </Route>
        <Route exact path='/cart'>
          <CartPage />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
