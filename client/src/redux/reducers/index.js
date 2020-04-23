import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';

const reducers = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    category: categoryReducer,
    error: errorReducer
});

export default reducers;