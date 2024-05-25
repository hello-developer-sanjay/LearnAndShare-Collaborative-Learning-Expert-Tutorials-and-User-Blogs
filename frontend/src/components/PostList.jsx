import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { Link } from 'react-router-dom';
import { searchPosts } from '../actions/postActions';
import SearchBlog from './SearchBlog';

const PostList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1); // State to track current page
    const [loadingMore, setLoadingMore] = useState(false); // State to track loading state
    const posts = useSelector(state => state.postReducer.posts);

    useEffect(() => {
        dispatch(fetchPosts(page)); // Fetch posts for the current page
    }, [dispatch, page]); 

    // Function to load more posts when user scrolls to the bottom
    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1); // Increment page number
        setLoadingMore(true); // Set loading state to true
    };

    // When new posts are loaded, set loading state to false
    useEffect(() => {
        setLoadingMore(false);
    }, [posts]);

    return (
        <div>
            <SearchBlog/>
            <h2>Posts</h2>
            {posts.slice(0, page * 5).map(post => (
                <div key={post._id}>
                    <h3><Link to={`/post/${post.slug}`}>{post.title}</Link></h3>
                    <p>Author: {post.author}</p>
                    <Link to={`/post/${post.slug}`}>Read More</Link>
                </div>
            ))}
            {loadingMore && <div>Loading more posts...</div>}
            {!loadingMore && (
                <button onClick={loadMorePosts}>Load More</button>
            )}
        </div>
    );
};

export default PostList;
    