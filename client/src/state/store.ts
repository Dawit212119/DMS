import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authApi from "./features/authApi";

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

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
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
export type AppDispatch = typeof store.dispatch;
export default store;
