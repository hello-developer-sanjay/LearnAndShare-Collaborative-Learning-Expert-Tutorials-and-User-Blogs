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
        const response = await axios.get('http://localhost:5000/api/categories/notifications', {
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
        const response = await axios.post('http://localhost:5000/api/categories/notifications', notification);
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
            `http://localhost:5000/api/notifications/${id}/read`,
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
// Follow a category
export const followCategory = (category, token, user) => async dispatch => {
    console.log(`Following category: ${category}`);
    console.log('user trying to follow', token);
    try {
        const response = await axios.post(
            'http://localhost:5000/api/categories/follow-category',
            { category },
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log(`Category followed successfully: ${category}`, response.data);
        dispatch({ type: FOLLOW_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(`Error following category (${category}):`, error);
    }
};

// Unfollow a category
export const unfollowCategory = (category, token) => async dispatch => {
    console.log(`Unfollowing category: ${category}`);
    try {
        const response = await axios.post(
            'http://localhost:5000/api/categories/unfollow-category',
            { category },
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log(`Category unfollowed successfully: ${category}`, response.data);
        dispatch({ type: UNFOLLOW_CATEGORY_SUCCESS, payload: response.data });
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
        const response = await axios.get('http://localhost:5000/api/categories/followed', {
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
