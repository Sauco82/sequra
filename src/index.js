import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App amount={100} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("sequra-app")
);