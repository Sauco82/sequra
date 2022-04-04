import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import filtersReducer from "./slices/filters/filtersSlice";
import { ajaxApi, gqlApi } from "./api/api";
import { configureStore } from "@reduxjs/toolkit";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        filters: filtersReducer,
        ajax:    ajaxApi.reducer,
        gql:     gqlApi.reducer
      },
      preloadedState,
      middleware: getDefaultMiddleware => (
        getDefaultMiddleware().concat(ajaxApi.middleware).concat(gqlApi.middleware)
      )
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };