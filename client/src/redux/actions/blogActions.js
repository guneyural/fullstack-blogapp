import {
    BLOG_LOADING,
    BLOGS_LOADED,
    BLOG_LOADED,
    BLOGS_LOADED_BY_CATEGORY,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../actions/types';
import { getErrors } from '../actions/errorActions';
import axios from 'axios';

export const loadBlogs = () => dispatch => {
    dispatch({ type: BLOG_LOADING });

    axios.get('/blog')
    .then(res=>{
        console.log(res.data);
        dispatch({ 
            type: BLOGS_LOADED,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
    })
}

export const loadBlogsByCategory = category => dispatch => {
    dispatch({ type: BLOG_LOADING });

    axios.get(`/blog/category/${category}`)
    .then(res=>{
        dispatch({
            type: BLOGS_LOADED_BY_CATEGORY,
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch(getErrors(err.resposne.data.mgs, err.response.status));
    });
};

export const loadBlog = id => dispatch => {
    dispatch({ type: BLOG_LOADING });

    axios.get(`/blog/${id}`)
    .then(res=>{
        dispatch({
            type: BLOG_LOADED,
            payload: res.data
        });
    })
    .catch(err=>{
       dispatch(getErrors(err.respnose.data.msg, err.response.status));
    });
} 

export const addBlog = ({title, text, image, category}) => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    const body = {title, text, image, category};

    axios.post('/blog', body, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type: ADD_BLOG,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.mgs, err.response.status));
    });
}

export const editBlog = ({ title, text, image, category }, id) => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    const body = { title, text, image, category };

    axios.put(`/blog/${id}`, body, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type: EDIT_BLOG,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
    });
}

export const deleteBlog = id  => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    axios.delete(`/blog/${id}`, tokenConfig(getState))
    .then(res=>{
        console.log(res.data);
        dispatch({
            type: DELETE_BLOG,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
    });
};

export const addComment = (body, id) => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    const data = {body};

    axios.post(`/blog/${id}/comment`, data, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status))
    }); 
};

export const editComment = (body, commentId) => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    const data = {body};

    axios.put(`/blog/comment/${commentId}/edit`, data, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type: EDIT_COMMENT,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
    })
}

export const deleteComment = commentId => (dispatch, getState) => {
    dispatch({ type: BLOG_LOADING });

    axios.delete(`/blog/comment/delete/${commentId}`, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data.msg, err.response.status));
    });
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