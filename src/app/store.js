import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const store = configureStore({
  reducer: {
    api: api.reducer    
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware().concat(api.middleware)
  )
});
