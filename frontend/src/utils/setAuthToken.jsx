import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token); // Update to store token in localStorage
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token'); // Update to remove token from localStorage
    }
};