import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { fetchUserPosts } from '../actions/postActions';
import { followCategory, unfollowCategory } from '../actions/notificationActions';
import '../styles/Category.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, loading, isAuthenticated } = useSelector(state => state.auth);
    const userPosts = useSelector(state => state.postReducer.userPosts);
    const followedCategories = useSelector(state => state.notifications.followedCategories);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const userParam = query.get('user');
        const tokenParam = query.get('token');

        if (userParam) {
            const userFromUrl = JSON.parse(decodeURIComponent(userParam));
            localStorage.setItem('user', JSON.stringify(userFromUrl));
            if (tokenParam) {
                localStorage.setItem('token', tokenParam);
            }
            dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userFromUrl, token: tokenParam } });
        } else if (isAuthenticated) {
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            const tokenFromLocalStorage = localStorage.getItem('token');
            if (userDataFromLocalStorage) {
                dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userDataFromLocalStorage, token: tokenFromLocalStorage } });
            } else {
                dispatch(loadUser());
            }
        }
    }, [dispatch, isAuthenticated, location.search]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            dispatch(fetchUserPosts());
        }
    }, [dispatch]);

    const filteredUserPosts = userPosts.filter(post => post.author === user.name);

    const handleFollow = (category) => {
        dispatch(followCategory(category, token));
    };

    const handleUnfollow = (category) => {
        dispatch(unfollowCategory(category, token));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view this page.</div>;
    }

    if (!user) {
        return <div>Error loading user data.</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <h2>Your Posts</h2>
            {(!filteredUserPosts || filteredUserPosts.length === 0) ? (
                <p>You have no posts.</p>
            ) : (
                filteredUserPosts.map(post => (
                    <div key={post._id}>
                        <h3><Link to={`/post/${post.slug}`}>{post.title}</Link></h3>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
            <h2>Your Followed Categories</h2>
            {(!followedCategories || followedCategories.length === 0) ? (
                <p>You are not following any categories.</p>
            ) : (
                followedCategories.map(category => (
                    <div key={category}>
                        <Link to={`/category/${category}`}>{category}</Link>
                        <button onClick={() => handleUnfollow(category)}>Unfollow</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;
