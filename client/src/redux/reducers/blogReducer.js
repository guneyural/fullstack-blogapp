import {
    BLOG_LOADING,
    BLOGS_LOADED,
    SEARCH_BLOG,
    BLOG_LOADED,
    BLOGS_LOADED_BY_CATEGORY,
    BLOGS_LOADED_BY_USER,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../actions/types';

const initialState = {
    isLoading: false,
    blogs: [],
    blog: {}
};

export default function(state = initialState, action) {
    switch(action.type){
        case BLOG_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case BLOGS_LOADED: 
            return {
                ...state,
                blogs: action.payload,
                isLoading: false
            }
        case SEARCH_BLOG:
            return {
                ...state,
                blogs: action.payload,
                isLoading: false
            }
        case BLOG_LOADED:
            return {
                ...state,
                isLoading: false,
                blog: {blog: action.payload.blog, comments: action.payload.comments}
            }
        case BLOGS_LOADED_BY_CATEGORY:
            return {
                ...state,
                isLoading: false,
                blogs: action.payload
            }
        case BLOGS_LOADED_BY_USER: 
            return {
                ...state,
                isLoading: false,
                blogs: action.payload
            }
        case ADD_BLOG:
            return {
                ...state,
                isLoading: false,
                blogs: [action.payload, ...state.blogs]
            }
        case EDIT_BLOG:
            return {
                ...state,
                isLoading: false,
                blogs: [...state.blogs.map(item => item._id === action.payload._id ? action.payload : item)]
            }
        case DELETE_BLOG: 
            return {
                ...state,
                isLoading: false,
                blogs: state.blogs.filter(item => item._id !== action.payload._id)
            }
        case ADD_COMMENT:
            return {
                ...state,
                isLoading: false,
                blog: {blog: state.blog.blog, comments: [action.payload, ...state.blog.comments]} 
            }
        case EDIT_COMMENT:
            return {
                ...state, 
                isLoading: false,
                blog: {blog: state.blog.blog, comments: [...state.blog.comments.map(item => item._id === action.payload._id ? action.payload : item)]}
            }
        case DELETE_COMMENT:
            return {
                ...state,
                isLoading: false,
                blog: {blog: state.blog.blog, comments: [...state.blog.comments.filter(item => item._id !== action.payload._id)]}
            }
        default: 
            return state;
    }
}
