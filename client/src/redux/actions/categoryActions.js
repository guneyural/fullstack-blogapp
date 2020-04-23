import {
    CATEGORY_LOADING,
    CATEGORY_LOADED    
} from './types';
import axios from 'axios';
import { getErrors } from './errorActions';

export const getCategories = () => dispatch => {
    dispatch({ type: CATEGORY_LOADING });

    axios.get('/api/blog/categories/all')
    .then(response=>{
        const categories = response.data.map(item=> item.category);

        dispatch({
            type: CATEGORY_LOADED,
            payload: categories
        })
    })
    .catch(err=> {
        dispatch(getErrors(err.response.data.msg, err.response.status));
    })
};