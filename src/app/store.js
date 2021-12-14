import { createStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import persistStore from 'redux-persist/es/persistStore';
import Auth from '../components/Auth/reducers/Auth';
import ListUser from '../components/UserManagement/reducers/ListUser';
import ListImage from '../components/ImageManagement/reducers/ListImage';


const rootReducer = combineReducers({
    Auth: Auth,
    ListUser: ListUser,
    ListImage: ListImage
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persister = persistStore(store)
    return { store, persistor: persister }
}