    import axios from 'axios';
    import { setAuthToken } from '../utils/setAuthToken';
    import { FETCH_USER_SUCCESS, LOGIN_SUCCESS } from './types';

    export const loadUser = () => async dispatch => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            localStorage.setItem('user', JSON.stringify(res.data.user));
            dispatch({ type: FETCH_USER_SUCCESS, payload: { user: res.data.user, token: localStorage.token } });
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
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
            dispatch({ type: LOGIN_SUCCESS, payload: { user: res.data.user, token: res.data.token } });
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);

            localStorage.setItem('user', JSON.stringify(res.data.user));
            dispatch(loadUser());
            console.log('Login successful:', res.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    export const register = formData => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: { user: res.data.user, token: res.data.token } });
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);

            localStorage.setItem('user', JSON.stringify(res.data.user));
            console.log('User registered successfully:', res.data);     
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };
