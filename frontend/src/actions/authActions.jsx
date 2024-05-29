import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import { FETCH_USER_SUCCESS, LOGIN_SUCCESS, FOLLOW_CATEGORY_SUCCESS, AUTHENTICATE_USER } from './types';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        dispatch({ type: AUTHENTICATE_USER, payload: true });
    }
    try {
        const res = await axios.get('https://hogwartsedx-backend-29may.onrender.com/api/auth/user');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({ type: FETCH_USER_SUCCESS, payload: { user: res.data.user, token: localStorage.token } });
        dispatch({ type: FOLLOW_CATEGORY_SUCCESS, payload: res.data.user.followedCategories });

        console.log('User loaded successfully:', res.data.user);
    } catch (error) {
        console.error('Error loading user:', error);
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('https://hogwartsedx-backend-29may.onrender.com/api/auth/login', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: { user: res.data.user, token: res.data.token } });
        setAuthToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(loadUser());
        console.log('Login successful:', res.data);
        return { success: true, role: res.data.user.role };
    } catch (error) {
        console.error('Error logging in:', error.response.data.message);
        return { success: false, message: error.response.data.message || 'Login failed' };
    }
};

export const register = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('https://hogwartsedx-backend-29may.onrender.com/api/auth/register', formData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: { user: res.data.user, token: res.data.token } });
        setAuthToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.log('User registered successfully:', res.data);     
    } catch (error) {
        console.error('Error registering user:', error);
    }
};
