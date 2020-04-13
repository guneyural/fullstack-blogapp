import {
    GET_ERRORS,
    CLEAR_ERRORS
} from '../actions/types';

export function getErrors(msg, status, id) {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}

export function clearErrors() {
    return {
        type: CLEAR_ERRORS
    }
}