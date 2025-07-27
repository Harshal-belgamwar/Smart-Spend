import { configureStore } from "@reduxjs/toolkit";
import Transaction from "./Slices/Transaction";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const storeConfig = {
  key: "root",
  storage,
};

const rootreducer = combineReducers({ Transaction: Transaction.reducer });

const persistreducer = persistReducer(storeConfig, rootreducer);

export const store = configureStore({
  reducer: persistreducer,
  
});

export const persistor = persistStore(store);
