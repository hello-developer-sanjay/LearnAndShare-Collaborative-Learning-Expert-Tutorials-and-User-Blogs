import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../actions/postActions';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 25px;
    margin-bottom: 10px;
    outline: none;
    font-size: 16px;
    width: 100%;
    max-width: 300px;

    @media (min-width: 768px) {
        margin-right: 10px;
        margin-bottom: 0;
    }
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const SearchCount = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #666;
`;

const ClearSearch = styled.span`
    font-size: 14px;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #0056b3;
    }
`;

const SearchBlog = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [searching, setSearching] = useState(false);
    const searchResults = useSelector((state) => state.searchResults);

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setSearching(false);
        }
    }, [searchResults]);

    const handleSearch = () => {
        if (keyword.trim() !== '') {
            setSearching(true);
            dispatch(searchPosts(keyword));
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setKeyword('');
        setSearching(false);
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search blog posts..."
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
            {!searching && searchResults && searchResults.length > 0 && (
                <SearchCount>{searchResults.length} results found</SearchCount>
            )}
            {!searching && searchResults && searchResults.length === 0 && (
                <SearchCount>No results found</SearchCount>
            )}
            {!searching && keyword !== '' && (
                <ClearSearch onClick={clearSearch}>Clear Search</ClearSearch>
            )}
        </SearchContainer>
    );
};

export default SearchBlog;
