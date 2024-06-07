import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
const SearchBlog = lazy(() => import('./SearchBlog'));
// Styled Components
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2em;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PostListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const PostContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5em;
  color: #007BFF;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostAuthor = styled.p`
  font-size: 1em;
  color: #555;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #555;
  animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 1s linear infinite;
`;

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
    <Container>
      <SearchBlog />
      <Title>Latest Posts</Title>
      <PostListContainer>
        {posts.slice(0, page * 5).map(post => (
          <PostContainer key={post._id}>
            <PostTitle><Link to={`/post/${post.slug}`}>{post.title}</Link></PostTitle>
            <PostAuthor>Author: {post.author}</PostAuthor>
            <ReadMoreLink to={`/post/${post.slug}`}>Read More</ReadMoreLink>
          </PostContainer>
        ))}
      </PostListContainer>
      {loadingMore && <LoadingSpinner>Loading...</LoadingSpinner>}
      {!loadingMore && (
        <LoadMoreButton onClick={loadMorePosts}>Load More</LoadMoreButton>
      )}
    </Container>
  );
};

export default PostList;
