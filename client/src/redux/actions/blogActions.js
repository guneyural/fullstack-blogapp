import {
    BLOGS_LOADING,
    BLOGS_LOADED,
    BLOG_LOADED,
    BLOGS_LOADED_BY_CATEGORY,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    COMMENT_ERROR,
    BLOG_ERROR
} from '../actions/types';
import { getErrors } from '../actions/errorActions';



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