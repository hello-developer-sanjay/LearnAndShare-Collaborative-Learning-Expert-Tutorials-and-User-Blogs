import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { fetchUserPosts } from '../actions/postActions';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { followCategory, unfollowCategory,fetchFollowedCategories } from '../actions/notificationActions';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user, loading, isAuthenticated } = useSelector(state => state.auth);
    const userPosts = useSelector(state => state.postReducer.userPosts);
    const followedCategories = useSelector(state => state.notifications.followedCategories);

    useEffect(() => {
        console.log("Checking authentication status...");
        console.log("IsAuthenticated:", isAuthenticated);
        console.log("User:", user);

        if (isAuthenticated && !user) {
            console.log("User authenticated, loading user data...");
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userDataFromLocalStorage) {
                console.log("User data found in localStorage:", userDataFromLocalStorage);
                dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userDataFromLocalStorage, token: localStorage.getItem('token') } });
            } else {
                console.log("No user data found in localStorage, loading from server...");
                dispatch(loadUser());
            }
        }

        // Fetch followed categories
        dispatch(fetchFollowedCategories()); // Dispatch action to fetch followed categories
    }, [dispatch, user, isAuthenticated]);


    useEffect(() => {
        console.log("Fetching user posts...");
        if (user) {
            dispatch(fetchUserPosts());
        }
    }, [dispatch, user]);

    const handleFollow = async (category) => {
        dispatch(followCategory(category, localStorage.getItem('token')));
    };

    const handleUnfollow = async (category) => {
        dispatch(unfollowCategory(category, localStorage.getItem('token')));
    };

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log("User not authenticated.");
        return <div>Please log in to view this page.</div>;
    }

    if (!user) {
        console.log("Error loading user data.");
        return <div>Error loading user data.</div>;
    }

    console.log("User data loaded successfully:", user);

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
            <h2>Your Followed Categories</h2>
            <ul>
            {followedCategories.map((category, index) => {
    if (!category) {
        return null; // Skip rendering if category is null or undefined
    }
    const animationProps = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        config: { duration: 1000 },
        delay: index * 200,
    });

    const isFollowed = followedCategories.includes(category.name);

    return (
        <animated.li key={category.name} className="category-item" style={animationProps}>
            <Link to={`/category/${category.name}`}>
                {category.icon}
                <span>{category.name}</span>
            </Link>
            {isFollowed ? (
                <button onClick={() => handleUnfollow(category.name)}>Unfollow</button>
            ) : (
                <button onClick={() => handleFollow(category.name)}>Follow</button>
            )}
        </animated.li>
    );
})}

            </ul>
        </div>
    );
};

export default Dashboard;
