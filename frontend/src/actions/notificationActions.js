import axios from 'axios';
import {
    FETCH_NOTIFICATIONS_SUCCESS,
    ADD_NOTIFICATION_SUCCESS,
    MARK_NOTIFICATION_AS_READ_SUCCESS,
    FOLLOW_CATEGORY_SUCCESS,
    UNFOLLOW_CATEGORY_SUCCESS,
    FETCH_FOLLOWED_CATEGORIES_SUCCESS
} from './types';
import { setAuthToken } from '../utils/setAuthToken';
const updateLocalStorage = (followedCategories) => {
    try {
        const serializedState = JSON.stringify(followedCategories);
        localStorage.setItem('followedCategories', serializedState);
    } catch (err) {
        console.error('Could not save state', err);
    }
};
// Fetch notifications
export const fetchNotifications = () => async dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    setAuthToken(token);

    console.log('Fetching notifications...');
    console.log('token is : ', token);
    try {
        const response = await axios.get('https://hogwartsedx-backend-29may.onrender.com/api/categories/notifications', {
            headers: {
                'x-auth-token': token
            }
        });
        console.log('Notifications fetched successfully:', response.data);
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

// Add a new notification
export const addNotification = (notification) => async dispatch => {
    console.log('Adding notification:', notification);
    try {
        const response = await axios.post('https://hogwartsedx-backend-29may.onrender.com/api/categories/notifications', notification);
        console.log('Notification added successfully:', response.data);
        dispatch({ type: ADD_NOTIFICATION_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};
// Mark a notification as read
export const markNotificationAsRead = (id, token) => async dispatch => {

    const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
        setAuthToken(token);
    console.log(" is token available : ", token);
    console.log(`Marking notification as read: ${id}`);
    try {
        

        const response = await axios.put(
            `https://hogwartsedx-backend-29may.onrender.com/api/notifications/${id}/read`,
            {},  // Ensure the body is correctly set
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log('Notification marked as read successfully:', response.data);
        dispatch({ type: MARK_NOTIFICATION_AS_READ_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(`Error marking notification as read (${id}):`, error);
    }
};
export const followCategory = (category, token) => async dispatch => {
    console.log(`Following category: ${category}`);
    try {
        const response = await axios.post(
            'https://hogwartsedx-backend-29may.onrender.com/api/categories/follow-category',
            { category },
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log(`Category followed successfully: ${category}`, response.data);
        const followedCategories = response.data;  // Ensure this returns the updated list
        updateLocalStorage(followedCategories);
        dispatch({ type: FOLLOW_CATEGORY_SUCCESS, payload: followedCategories });
    } catch (error) {
        console.error(`Error following category (${category}):`, error);
    }
};

export const unfollowCategory = (category, token) => async dispatch => {
    console.log(`Unfollowing category: ${category}`);
    try {
        const response = await axios.post(
            'https://hogwartsedx-backend-29may.onrender.com/api/categories/unfollow-category',
            { category },
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log(`Category unfollowed successfully: ${category}`, response.data);
        const followedCategories = response.data;  // Ensure this returns the updated list
        updateLocalStorage(followedCategories);
        dispatch({ type: UNFOLLOW_CATEGORY_SUCCESS, payload: followedCategories });
    } catch (error) {
        console.error(`Error unfollowing category (${category}):`, error);
    }
};
export const fetchFollowedCategories = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    setAuthToken(token);

    console.log('Fetching followed categories...');
    try {
        const response = await axios.get('https://hogwartsedx-backend-29may.onrender.com/api/categories/followed', {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log('Followed categories fetched successfully:', response.data);
        dispatch({ type: FETCH_FOLLOWED_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching followed categories:', error);
    }
};
