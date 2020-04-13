import { 
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from '../actions/types';
import { getErrors } from './errorActions';
import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/user', tokenConfig(getState))
    .then(user=>{
        dispatch({ type: USER_LOADED, payload: user.data });
    })  
    .catch(err =>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
        dispatch({ type: AUTH_ERROR });
    });
};

export const registerUser = (firstName, lastName, username, email, password) => dispatch => {
    dispatch({ type: USER_LOADING });

    const data = {firstName, lastName, username, email, password};
    const body = JSON.stringify(data);

    axios.post('/user/register', body)
    .then(user => {
        dispatch({ type: REGISTER_SUCCESS, payload: {token: user.data.token, user: user.data.user} })
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status));
        dispatch({ type: AUTH_ERROR });
    })
};

export const loginUser = (email, password) => dispatch => {
    dispatch({ type: USER_LOADING });

    const data = {email, password};
    const body = JSON.stringify(data);

    axios.post('/user/login', body)
    .then(user => {
        dispatch({ type: LOGIN_SUCCESS, payload: {token: user.data.token, user: user.data.token} });
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status));
        dispatch({ type: AUTH_ERROR });
    });
}

export const logoutUser = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

function tokenConfig(getState) {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(token){
        config.headers['auth-token'] = token;
    }

    return config;
}