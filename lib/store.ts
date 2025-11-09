import { configureStore } from "@reduxjs/toolkit";
import { storiesApi } from "./api/storiesApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [storiesApi.reducerPath]: storiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(storiesApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
