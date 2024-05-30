import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostBySlug, markPostAsCompleted, fetchCompletedPosts } from '../actions/postActions';
import { useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 96vh;
`;

const Content = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #f4f4f9;
    color: ${({ color }) => color};
    font-family: ${({ fontFamily }) => fontFamily};
`;

const SidebarContainer = styled.div`
    width: 250px;
    background-color: #2c3e50;
    color: #ecf0f1;
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        width: ${(props) => (props.isOpen ? '100%' : '0')};
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        transition: width 0.3s;
        z-index: 1000;
    }
`;

const SidebarHeader = styled.div`
    padding: 2px;
    font-size: 1.2em;
    background-color: #34495e;
    text-align: center;
`;

const SubtitlesList = styled.ul`
    list-style-type: none;
    padding: 0;
    overflow-y: auto;
    flex: 1;
`;

const SubtitleItem = styled.li`
    padding: 10px 20px;
    border-bottom: 1px solid #34495e;
    cursor: pointer;
    &:hover {
        background-color: #34495e;
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    color: inherit;
    text-align: left;
    width: 100%;
    padding: 0;
    font-size: 1em;
`;

const ToggleButton = styled.button`
    display: none;
    background: #e74c3c;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1010;
    @media (max-width: 768px) {
        display: block;
    }
`;

const PostHeader = styled.h1`
    font-size: 2.5em;
    color: #2c3e50;
    text-align: left;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        font-size: 1.5em;
    }
`;

const SubtitleHeader = styled.h2`
    font-size: 2em;
    color: #34495e;
    margin: 20px 0 10px;
`;

const SummaryContainer = styled.div`
    margin-top: 20px;
`;

const CodeSnippetContainer = styled.div`
    position: relative;
    margin: 20px 0;
    background: #1e1e1e;
    border-radius: 5px;
    overflow: hidden;
`;

const CopyButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;

const CompleteButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${({ isCompleted }) => (isCompleted ? '#27ae60' : '#2c3e50')};
    color: #ecf0f1;
    border: none;
    cursor: ${({ isCompleted }) => (isCompleted ? 'not-allowed' : 'pointer')};
    &:hover {
        background-color: ${({ isCompleted }) => (isCompleted ? '#27ae60' : '#34495e')};
    }
`;

const PostPage = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postReducer.post);
    const user = useSelector((state) => state.auth.user);
    const completedPosts = useSelector((state) => state.postReducer.completedPosts);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (post && post.title) {
            document.title = `${post.title} | HogwartsEdx`;
        }
    }, [post]);

    useEffect(() => {
        dispatch(fetchPostBySlug(slug));
        dispatch(fetchCompletedPosts());
    }, [dispatch, slug]);

    const handleMarkAsCompleted = () => {
        if (post && Array.isArray(completedPosts) && !completedPosts.includes(post._id)) {
            dispatch(markPostAsCompleted(post._id));
        }
    };

    const isCompleted = Array.isArray(completedPosts) && completedPosts.includes(post?._id);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (isSidebarOpen) setSidebarOpen(false);
        }
    };

    const handleCopyCode = () => {
        toast.success('Code copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
                  <Helmet>
                    <title>{post ? `${post.title} | HogwartsEdx` : 'Loading...'}</title>
                                    <title>{post ? `${post.title} | HogwartsEdx` : 'Loading...'}</title>
        <meta
            name="description"
            content={post.content}
        />
        
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.titleImage} />
        <meta name="twitter:image" content={post.titleImage} />

                    </Helmet>
            <Content>
                <ToggleButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? 'Close' : 'Menu'}
                </ToggleButton>
                <PostHeader>{post.title}</PostHeader>
                {post.titleImage && (
                    <Zoom>
                        <img
                            src={post.titleImage}
                            alt={post.title}
                            style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block' }}
                        />
                    </Zoom>
                )}
                {post.titleVideo && (
                    <video controls style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}>
                        <source src={post.titleVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                <p>Date Published : {post.date}</p>
                <p>Author: {post.author}</p>
                <p>{post.content}</p>

                {post.subtitles.map((subtitle, index) => (
                    <div key={index} id={`subtitle-${index}`}>
                        <SubtitleHeader>{subtitle.title}</SubtitleHeader>
                        {subtitle.image && (
                            <Zoom>
                                <img
                                    src={subtitle.image}
                                    alt={subtitle.title}
                                    style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}
                                />
                            </Zoom>
                        )}
                        {subtitle.video && (
                            <video controls style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}>
                                <source src={subtitle.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <ul>
                            {subtitle.bulletPoints.map((point, pointIndex) => (
                                <li key={pointIndex} style={{ marginBottom: '10px' }}>
                                    {point.text}
                                    {point.image && (
                                        <Zoom>
                                            <img
                                                src={point.image}
                                                alt={point.text}
                                                style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}
                                            />
                                        </Zoom>
                                    )}
                                    {point.video && (
                                        <video controls style={{ width: '100%', maxWidth: '400px', margin: '10px 0' }}>
                                            <source src={point.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {point.codeSnippet && (
                                        <CodeSnippetContainer>
                                            <CopyToClipboard text={point.codeSnippet} onCopy={handleCopyCode}>
                                                <CopyButton>Copy</CopyButton>
                                            </CopyToClipboard>
                                            <SyntaxHighlighter language="javascript" style={vs}>
                                                {point.codeSnippet}
                                            </SyntaxHighlighter>
                                        </CodeSnippetContainer>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {post.summary && (
                    <SummaryContainer id="summary">
                        <SubtitleHeader>Summary</SubtitleHeader>
                        <p>{post.summary}</p>
                    </SummaryContainer>
                )}
                <CompleteButton
                    onClick={handleMarkAsCompleted}
                    disabled={isCompleted}
                    isCompleted={isCompleted}
                >
                    {isCompleted ? 'Completed' : 'Mark as Completed'}
                </CompleteButton>
            </Content>
            <SidebarContainer isOpen={isSidebarOpen}>
                <SidebarHeader>Contents</SidebarHeader>
                <SubtitlesList>
                    {post.subtitles.map((subtitle, index) => (
                        <SubtitleItem key={index}>
                            <Button onClick={() => scrollToSection(`subtitle-${index}`)}>{subtitle.title}</Button>
                        </SubtitleItem>
                    ))}
                      {post.summary && (
                        <SubtitleItem>
                            <Button onClick={() => scrollToSection('summary')}>Summary</Button>
                        </SubtitleItem>
                    )}
                </SubtitlesList>
            </SidebarContainer>
        </Container>
    );
};

export default PostPage;
