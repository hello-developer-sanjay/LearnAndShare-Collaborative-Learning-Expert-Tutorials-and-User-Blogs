import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { Link, useParams } from 'react-router-dom';
import { useSpring, useTrail, animated } from 'react-spring';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postReducer.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter(post => post.category === category);

    if (!posts) {
        return <div>Loading...</div>;
    }

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 1000 }
    });

    const trail = useTrail(filteredPosts.length, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
        delay: 1000 // Delay for the titles to start appearing after the initial load
    });

    return (
        <animated.div style={fadeIn} className="category-page">
            <h2 className="category-title">Category: {category}</h2>
            {filteredPosts.length === 0 ? (
                <p className="no-posts">No posts found in this category.</p>
            ) : (
                <ul className="post-list">
                    {trail.map((style, index) => (
                        <animated.li key={filteredPosts[index]._id} style={style} className="post-item">
                            <Link to={`/post/${filteredPosts[index].slug}`} className="post-link">
                                <h3 className="post-title">{filteredPosts[index].title}</h3>
                            </Link>
                        </animated.li>
                    ))}
                </ul>
            )}
        </animated.div>
    );
};

export default CategoryPage;
