import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { authApi } from "./features/authApi";
import projectReducer from "./project/projectSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { userProjectsApi } from "./features/userProjectApi";

// Configuration for Redux Persist
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["createPost", "currentUser"], // Persisted reducers
// };

// Combine reducers
// const rootReducer = combineReducers({
//   [authApi.reducerPath]: authApi.reducer,
// });

// Wrap rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store

// src/app/store.ts

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["project"], // Only persist project reducer
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    project: projectReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userProjectsApi.reducerPath]: userProjectsApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, userProjectsApi.middleware),
});

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable serializability check for redux-persist
//     }).concat(authApi.middleware), // Add both middlewares
// });

// Persistor for the store
// export const persistor = persistStore(store);

// TypeScript types for store
export type RootState = ReturnType<typeof store.getState>;
// console.log(RootState);
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
