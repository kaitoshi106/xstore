import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ProductsProvider } from "./hooks/context/products_context";
import './index.css';

ReactDOM.render(
    <ProductsProvider>
      <App />
    </ProductsProvider>,
  document.querySelector("#root")
);
