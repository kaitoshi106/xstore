import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import { CartProvider } from "./hooks/context/cart_context";
import { FilterProvider } from "./hooks/context/filter_context";
import { ProductsProvider } from "./hooks/context/products_context";

ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>,
  document.querySelector("#root")
);
