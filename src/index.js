import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { FilterProvider } from "./hooks/context/filter_context";
import { ProductsProvider } from "./hooks/context/products_context";
import './index.css';

ReactDOM.render(
    <ProductsProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ProductsProvider>,
  document.querySelector("#root")
);
