import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import errorReducer from './errorReducer';

const reducers = combineReducers(authReducer, blogReducer, errorReducer);

export default reducers;