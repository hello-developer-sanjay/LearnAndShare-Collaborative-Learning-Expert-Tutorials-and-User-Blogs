import { FETCH_USER_SUCCESS, LOGIN_SUCCESS, AUTHENTICATE_USER, FOLLOW_CATEGORY_SUCCESS, UNFOLLOW_CATEGORY_SUCCESS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true,
    user: null,
    followedCategories: JSON.parse(localStorage.getItem('followedCategories')) || [] 
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_USER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('User data received:', payload.user);
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            return {
                ...state,
                token: payload.token || localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                followedCategories: payload.user.followedCategories
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: payload
            };
        case FOLLOW_CATEGORY_SUCCESS:
            console.log('Category followed:', payload);
            const updatedFollowedCategories = [...state.followedCategories, payload];
            localStorage.setItem('followedCategories', JSON.stringify(updatedFollowedCategories)); // Update followed categories in localStorage
            return {
                ...state,
                followedCategories: updatedFollowedCategories
            };
        case UNFOLLOW_CATEGORY_SUCCESS:
            console.log('Category unfollowed:', payload);
            const filteredFollowedCategories = state.followedCategories.filter(category => category !== payload);
            localStorage.setItem('followedCategories', JSON.stringify(filteredFollowedCategories)); // Update followed categories in localStorage
            return {
                ...state,
                followedCategories: filteredFollowedCategories
            };
        default:
            return state;
    }
};

export default authReducer;
