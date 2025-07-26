import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit'

import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from '../reducerSlices/userSlice';
import productSlice from '../reducerSlices/productSlice';
import adminSlice from '../reducerSlices/adminSlice';

const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    user: userSlice,
    product: productSlice,
    admin:adminSlice,
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)  
export const store = configureStore({
    reducer: persistedReducer,
  middleware: () => new Tuple( logger),

})

export const persistor = persistStore(store)

