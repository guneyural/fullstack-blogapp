import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import errorReducer from './errorReducer';

const reducers = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    error: errorReducer
});

export default reducers;