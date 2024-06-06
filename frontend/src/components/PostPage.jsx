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
import { RingLoader } from 'react-spinners';

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
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
  z-index: 9999; /* Ensure it's above other elements */
`;

const ComparisonTableContainer = styled.div`
    margin-top: 20px;
    overflow-x: auto;
`;

const ComparisonTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    min-width: 800px;
`;

const TableHeader = styled.th`
    background-color: #34495e;
    color: #ecf0f1;
    padding: 15px;
    border: 1px solid #34495e;
`;

const TableCell = styled.td`
    border: 1px solid #34495e;
    padding: 15px;
    vertical-align: top;
`;

const ResponsiveContent = styled.div`
    overflow: auto;
    white-space: nowrap;
`;

const ResponsiveTable = styled.table`
    border-collapse: collapse;
    width: auto;
    min-width: 800px;
`;

const ResponsiveHeader = styled.th`
    background-color: #34495e;
    color: #ecf0f1;
    padding: 15px;
    border: 1px solid #34495e;
    min-width: 150px;
`;

const ResponsiveCell = styled.td`
    border: 1px solid #34495e;
    padding: 15px;
    vertical-align: top;
    min-width: 150px;
    max-width: 300px; /* Adjust the max-width as needed */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
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
    return (
        <LoadingOverlay>
            <RingLoader color="#2c3e50" />
            size={150}
        </LoadingOverlay>
    );
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
            <meta property="og:description" content={post.content} />
            <meta property="og:image" content={post.titleImage} />
            <meta property="og:url" content={window.location.href} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.content} />
            <meta name="twitter:image" content={post.titleImage} />
            <link rel="icon" type="image/svg+xml" href={post.titleImage} />
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
                                <source src={subtitle.video} />
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
{post.superTitles && 
 post.superTitles.length > 0 && 
 post.superTitles.some(superTitle => 
    superTitle.superTitle.trim() !== '' &&
    superTitle.attributes && 
    superTitle.attributes.length > 0 && 
    superTitle.attributes.some(attr => 
        attr.attribute.trim() !== '' &&
        attr.items && 
        attr.items.length > 0 && 
        attr.items.some(item => 
            item.title.trim() !== '' &&
            item.bulletPoints && 
            item.bulletPoints.length > 0 &&
            item.bulletPoints.some(point => point.trim() !== '')
        )
    )
) && (
    <ComparisonTableContainer>
        <SubtitleHeader>Comparison</SubtitleHeader>
        <ResponsiveContent>
            <ResponsiveTable>
                <thead>
                    <tr>
                        <TableHeader>Attribute</TableHeader>
                        {post.superTitles.map((superTitle, index) => (
                            superTitle.superTitle.trim() !== '' && superTitle.attributes && superTitle.attributes.length > 0 && (
                                <ResponsiveHeader key={index}>{superTitle.superTitle}</ResponsiveHeader>
                            )
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {post.superTitles[0].attributes.map((attr, attrIndex) => (
                        attr.attribute.trim() !== '' && attr.items && attr.items.length > 0 && attr.items.some(item => item.title.trim() !== '' || (item.bulletPoints && item.bulletPoints.length > 0 && item.bulletPoints.some(point => point.trim() !== ''))) && (
                            <tr key={attrIndex}>
                                <TableCell>{attr.attribute}</TableCell>
                                {post.superTitles.map((superTitle, superIndex) => (
                                    superTitle.attributes[attrIndex] && superTitle.attributes[attrIndex].items && superTitle.attributes[attrIndex].items.length > 0 && (
                                        <ResponsiveCell key={superIndex}>
                                            {superTitle.attributes[attrIndex].items.map((item, itemIndex) => (
                                                (item.title.trim() !== '' || (item.bulletPoints && item.bulletPoints.length > 0 && item.bulletPoints.some(point => point.trim() !== ''))) && (
                                                    <div key={itemIndex}>
                                                        <strong>{item.title}</strong>
                                                        <ul>
                                                            {item.bulletPoints.map((point, pointIndex) => (
                                                                point.trim() !== '' && <li key={pointIndex}>{point}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )
                                            ))}
                                        </ResponsiveCell>
                                    )
                                ))}
                            </tr>
                        )
                    ))}
                </tbody>
            </ResponsiveTable>
        </ResponsiveContent>
    </ComparisonTableContainer>
)}
                
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
