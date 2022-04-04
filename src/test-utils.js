import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

import { api } from "./api/api";
import { configureStore } from "@reduxjs/toolkit";


function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {        
        api: api.reducer,        
      },
      preloadedState,
      middleware: getDefaultMiddleware => (
        getDefaultMiddleware().concat(api.middleware)
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