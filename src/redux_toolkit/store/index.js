import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import ThemeSlice from '../slices/ThemeSlice';
import AuthSlice from "../slices/AuthSlice";
import TaskSlice from "../slices/TaskSlice";
import LocationSlice from "../slices/LocationSlice";
import {combineReducers} from 'redux';
import {FLUSH,PAUSE,PERSIST,persistReducer,persistStore,PURGE,REGISTER,REHYDRATE} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    theme: ThemeSlice,
    auth: AuthSlice,
    task:TaskSlice,
    location:LocationSlice
  });


  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage
  }


  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
export const persistor = persistStore(store);
export default store;

