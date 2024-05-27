import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import postReducer from './reducers/postReducer';
import certificateReducer from './reducers/certificateReducer';
import authReducer from './reducers/authReducer';
import settingsReducer from './reducers/settingsReducer'; 
import notificationReducer from './reducers/notificationReducer';
import { loadState, saveState } from './utils/localStorage';

const persistedFollowedCategories = loadState();

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  postReducer,
  certificate: certificateReducer,
  settings: settingsReducer,
});

const initialState = {
  notifications: {
    followedCategories: persistedFollowedCategories || []
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

// Save the followed categories to local storage whenever they change
store.subscribe(() => {
  const state = store.getState();
  saveState(state.notifications.followedCategories);
});

export default store;
