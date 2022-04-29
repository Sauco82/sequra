import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const mainAmountElement = document.getElementsByClassName("sequra-main-amount")[0],
      quantityElement = document.getElementsByClassName("sequra-quantity")[0],
      mainAmount = parseFloat(mainAmountElement.textContent),
      quantity = quantityElement.value,
      amount = mainAmount * quantity;

const container = document.getElementById("sequra-app"),
      root = createRoot(container);

const renderApp = amount => root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App amount={amount} />
    </Provider>
  </React.StrictMode>
);

renderApp(amount);

quantityElement.addEventListener("change", e =>renderApp(e.target.value * mainAmount));