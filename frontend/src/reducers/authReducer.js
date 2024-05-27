import { FETCH_USER_SUCCESS, LOGIN_SUCCESS,AUTHENTICATE_USER,FOLLOW_CATEGORY_SUCCESS, UNFOLLOW_CATEGORY_SUCCESS  } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false, // Initialize from localStorage
    loading: true,
    user:null,
    followedCategories: JSON.parse(localStorage.getItem('user'))?.followedCategories || []
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_USER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('User data received:', payload.user); // Add console log to check received user data
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }            return {
                ...state,
                token: payload.token || localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: payload.user ,
                followedCategories: payload.user.followedCategories

            };
            case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: payload
            };
            case FOLLOW_CATEGORY_SUCCESS:
                console.log('Category followed:', payload);
                return {
                    ...state,
                    followedCategories: [...state.followedCategories, payload]
                };
            case UNFOLLOW_CATEGORY_SUCCESS:
                console.log('Category unfollowed:', payload);
                return {
                    ...state,
                    followedCategories: state.followedCategories.filter(category => category !== payload)
                };
        default:    
            console.log('No action taken:', action); // Add console log for default case
            return state; // Add default case to return the current state
    }
};

export default authReducer;
