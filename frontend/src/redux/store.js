// import { createStore } from 'redux';
// import { userReducer } from './reducer';


// const store = createStore(userReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import { userSlice } from './reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default store;