import { 
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    GET_USER_BY_ID,
    LOGOUT_SUCCESS,
    AUTH_ERROR
 } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    visitedProfile: {},
    user: null
};

export default function(state = initialState, action) {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            return {
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case GET_USER_BY_ID:
            return {
                ...state,
                loading: false,
                visitedProfile: {...action.payload}
            }
        default:
            return state
    }
}