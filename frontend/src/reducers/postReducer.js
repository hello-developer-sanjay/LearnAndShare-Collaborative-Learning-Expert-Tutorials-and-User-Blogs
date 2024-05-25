// postReducer.js

import {
    FETCH_POSTS_SUCCESS,
    ADD_POST_SUCCESS,
    FETCH_USER_POSTS_SUCCESS,
    UPDATE_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    SEARCH_POSTS_SUCCESS ,
    FETCH_POST_SUCCESS ,
    MARK_POST_COMPLETED_SUCCESS,
    FETCH_COMPLETED_POSTS_SUCCESS,
    FETCH_COMPLETED_POSTS_FAILURE
    // Add SEARCH_POSTS_SUCCESS constant
} from '../actions/postActions';

const initialState = {
    posts: [],
    userPosts: [],
    completedPosts: [],

    post: null // Add post field to store the fetched post

};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
            case FETCH_COMPLETED_POSTS_SUCCESS:
            return {
                ...state,
                completedPosts: action.payload, // Ensure this is an array
            };
        case FETCH_COMPLETED_POSTS_FAILURE:
            return {
                ...state,
                completedPosts: [],
            };
        case FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                userPosts: action.payload
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                userPosts: [action.payload, ...state.userPosts]
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                userPosts: state.userPosts.map(post => post._id === action.payload._id ? action.payload : post)
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                userPosts: state.userPosts.filter(post => post._id !== action.payload)
            };
        case SEARCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.concat(state.posts.filter(post => !action.payload.find(p => p._id === post._id)))
            };
            case FETCH_POST_SUCCESS:
                return {
                    ...state,
                    post: action.payload // Update the post field with the fetched post
                };
                case MARK_POST_COMPLETED_SUCCESS:
                    return { ...state, completedPosts: action.payload };
                case FETCH_COMPLETED_POSTS_SUCCESS:
                    return { ...state, completedPosts: action.payload };
        default:
            return state;
    }
};

export default postReducer;
