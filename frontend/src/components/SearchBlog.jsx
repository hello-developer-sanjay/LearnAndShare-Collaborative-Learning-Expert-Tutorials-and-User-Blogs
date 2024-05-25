// SearchBlog.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../actions/postActions';

const SearchBlog = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        dispatch(searchPosts(keyword));
    };

    return (
        <div>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBlog;
