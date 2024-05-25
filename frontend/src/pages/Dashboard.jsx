import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { fetchUserPosts } from '../actions/postActions';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.auth);
    const userPosts = useSelector(state => state.postReducer.userPosts);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(loadUser());
        }
    }, [dispatch, user, isAuthenticated]);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPosts());
        }
    }, [dispatch, user]);

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
            {(!userPosts || userPosts.length === 0) ? (
                <p>You have no posts.</p>
            ) : (
                userPosts.map(post => (
                    <div key={post._id}>
                        <h3><Link to={`/post/${post.slug}`}>{post.title}</Link></h3>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;
