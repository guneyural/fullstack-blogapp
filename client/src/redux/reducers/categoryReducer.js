import {
    CATEGORY_LOADING,
    CATEGORY_LOADED
} from '../actions/types';

const initialState = {
    isLoading: false,
    categories: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORY_LOADED: 
            return {
                isLoading: false,
                categories: action.payload
            }
        default:
            return state
    }
}