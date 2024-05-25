import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import postReducer from './reducers/postReducer';
import certificateReducer from './reducers/certificateReducer';
import authReducer from './reducers/authReducer';
const initialState = {};

const middleware = [thunk];

const store = createStore(
    combineReducers({
        auth: authReducer,
         postReducer,
         certificateReducer
    }),
    initialState,
    applyMiddleware(...middleware)
);

export default store;
