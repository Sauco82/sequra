import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const mainAmountElement = document.getElementsByClassName("sequra-main-amount")[0],
      quantityElement = document.getElementsByClassName("sequra-quantity")[0],
      mainAmount = parseFloat(mainAmountElement.textContent),
      quantity = quantityElement.value,
      amount = mainAmount * quantity;

const renderApp = amount => ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App amount={amount} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("sequra-app")
);

renderApp(amount);

quantityElement.addEventListener("change", e =>renderApp(e.target.value * mainAmount));