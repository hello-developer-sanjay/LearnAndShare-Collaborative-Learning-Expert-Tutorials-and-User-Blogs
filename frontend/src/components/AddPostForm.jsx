import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/postActions';
import { loadUser } from '../actions/authActions';
import axios from 'axios';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// Styled Components
const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
    margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const IconButton = styled(Button)`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    outline: inherit;
`;

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [titleImage, setTitleImage] = useState(null);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('VS Code');
    const [subtitles, setSubtitles] = useState([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
    const [summary, setSummary] = useState('');
    const { user } = useSelector(state => state.auth);
    const [video, setVideo] = useState(null);
    const categories = [
        'VS Code', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 
        'Gatsby', 'Svelte', 'TypeScript', 'GraphQL', 'PHP', 'Python', 'Ruby', 'Java', 'C#', 'C++', 'Swift', 
        'Kotlin', 'Dart', 'Flutter', 'React Native'
    ];
    const [superTitles, setSuperTitles] = useState([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);

    // Handle changes in super titles
    const handleSuperTitleChange = (index, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[index][field] = value;
        setSuperTitles(newSuperTitles);
    };

    // Handle changes in attributes
    const handleAttributeChange = (superTitleIndex, attributeIndex, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex][field] = value;
        setSuperTitles(newSuperTitles);
    };

    // Handle changes in items
    const handleItemChange = (superTitleIndex, attributeIndex, itemIndex, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex].items[itemIndex][field] = value;
        setSuperTitles(newSuperTitles);
    };

    // Add a new super title
    const addSuperTitle = () => {
        setSuperTitles([...superTitles, { superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
    };

    // Add a new attribute under a super title
    const addAttribute = (superTitleIndex) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes.push({ attribute: '', items: [{ title: '', bulletPoints: [''] }] });
        setSuperTitles(newSuperTitles);
    };

    // Add a new item under an attribute
    const addItem = (superTitleIndex, attributeIndex) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex].items.push({ title: '', bulletPoints: [''] });
        setSuperTitles(newSuperTitles);
    };

    useEffect(() => {
        if (!user) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: storedUser, token: localStorage.getItem('token') } });
            } else {
                dispatch(loadUser());
            }
        }
    }, [dispatch, user]);

    const handleSubtitleChange = (index, field, value) => {
        const newSubtitles = [...subtitles];
        newSubtitles[index][field] = value;
        setSubtitles(newSubtitles);
    };

    const handleBulletPointChange = (subtitleIndex, pointIndex, field, value) => {
        const newSubtitles = [...subtitles];
        newSubtitles[subtitleIndex].bulletPoints[pointIndex][field] = value;
        setSubtitles(newSubtitles);
    };

    const handleImageUpload = async (e, setImage) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('https://hogwartsedx-api-15jun.onrender.com/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImage(res.data.filePath);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('video', file);

        try {
            const res = await axios.post('https://hogwartsedx-api-15jun.onrender.com/upload/video', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setVideo(res.data.filePath);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const addSubtitle = () => {
        setSubtitles([...subtitles, { title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
    };

    const addBulletPoint = (subtitleIndex) => {
        const newSubtitles = [...subtitles];
        newSubtitles[subtitleIndex].bulletPoints.push({ text: '', image: null, codeSnippet: '' });
        setSubtitles(newSubtitles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error('User not found');
            return;
        }
        try {
            const sanitizedSubtitles = subtitles.map(sub => ({
                ...sub,
                bulletPoints: sub.bulletPoints.map(point => ({
                    ...point,
                    codeSnippet: DOMPurify.sanitize(point.codeSnippet)
                }))
            }));
            dispatch(addPost(title, content, category, sanitizedSubtitles, summary, titleImage, superTitles, video));
            setTitle('');
            setTitleImage(null);
            setContent('');
            setVideo(null);
            setCategory('VS Code');
            setSubtitles([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
            setSummary('');
            setSuperTitles([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);

        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <FormContainer>
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <Section>
                    <SectionTitle>Post Details</SectionTitle>
                    <FormGroup>
                        <Tooltip title="Enter the title of your post">
                            <Label htmlFor="title">Title:</Label>
                        </Tooltip>
                        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Upload a title image">
                            <Label htmlFor="titleImage">Title Image:</Label>
                        </Tooltip>
                        <Input type="file" id="titleImage" onChange={(e) => handleImageUpload(e, setTitleImage)} />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Enter the main content of your post">
                            <Label htmlFor="content">Content:</Label>
                        </Tooltip>
                        <TextArea id="content" value={content} onChange={(e) => setContent(e.target.value)} required></TextArea>
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Select a category for your post">
                            <Label htmlFor="category">Category:</Label>
                        </Tooltip>
                        <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Select>
                    </FormGroup>
                </Section>

                <Section>
                    <SectionTitle>Super Titles</SectionTitle>
                    {superTitles.map((superTitle, superTitleIndex) => (
                        <div key={superTitleIndex}>
                            <FormGroup>
                                <Tooltip title="Enter the super title">
                                    <Label htmlFor={`superTitle-${superTitleIndex}`}>Super Title:</Label>
                                </Tooltip>
                                <Input
                                    type="text"
                                    id={`superTitle-${superTitleIndex}`}
                                    value={superTitle.superTitle}
                                    onChange={(e) => handleSuperTitleChange(superTitleIndex, 'superTitle', e.target.value)}
                                />
                            </FormGroup>
                            {superTitle.attributes.map((attribute, attributeIndex) => (
                                <div key={attributeIndex}>
                                    <FormGroup>
                                        <Tooltip title="Enter an attribute">
                                            <Label htmlFor={`attribute-${superTitleIndex}-${attributeIndex}`}>Attribute:</Label>
                                        </Tooltip>
                                        <Input
                                            type="text"
                                            id={`attribute-${superTitleIndex}-${attributeIndex}`}
                                            value={attribute.attribute}
                                            onChange={(e) => handleAttributeChange(superTitleIndex, attributeIndex, 'attribute', e.target.value)}
                                        />
                                    </FormGroup>
                                    {attribute.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <FormGroup>
                                                <Tooltip title="Enter an item title">
                                                    <Label htmlFor={`item-${superTitleIndex}-${attributeIndex}-${itemIndex}`}>Item Title:</Label>
                                                </Tooltip>
                                                <Input
                                                    type="text"
                                                    id={`item-${superTitleIndex}-${attributeIndex}-${itemIndex}`}
                                                    value={item.title}
                                                    onChange={(e) => handleItemChange(superTitleIndex, attributeIndex, itemIndex, 'title', e.target.value)}
                                                />
                                            </FormGroup>
                                            {item.bulletPoints.map((bulletPoint, bulletPointIndex) => (
                                                <FormGroup key={bulletPointIndex}>
                                                    <Tooltip title="Enter a bullet point">
                                                        <Label htmlFor={`bulletPoint-${superTitleIndex}-${attributeIndex}-${itemIndex}-${bulletPointIndex}`}>Bullet Point:</Label>
                                                    </Tooltip>
                                                    <Input
                                                        type="text"
                                                        id={`bulletPoint-${superTitleIndex}-${attributeIndex}-${itemIndex}-${bulletPointIndex}`}
                                                        value={bulletPoint}
                                                        onChange={(e) => {
                                                            const newSuperTitles = [...superTitles];
                                                            newSuperTitles[superTitleIndex].attributes[attributeIndex].items[itemIndex].bulletPoints[bulletPointIndex] = e.target.value;
                                                            setSuperTitles(newSuperTitles);
                                                        }}
                                                    />
                                                </FormGroup>
                                            ))}
                                            <Button type="button" onClick={() => {
                                                const newSuperTitles = [...superTitles];
                                                newSuperTitles[superTitleIndex].attributes[attributeIndex].items[itemIndex].bulletPoints.push('');
                                                setSuperTitles(newSuperTitles);
                                            }}>
                                                Add Bullet Point
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" onClick={() => addItem(superTitleIndex, attributeIndex)}>Add Item</Button>
                                </div>
                            ))}
                            <Button type="button" onClick={() => addAttribute(superTitleIndex)}>Add Attribute</Button>
                        </div>
                    ))}
                    <Button type="button" onClick={addSuperTitle}>Add Super Title</Button>
                </Section>

                <Section>
                    <SectionTitle>Comparison Table</SectionTitle>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Super Title</TableCell>
                                    <TableCell>Attributes</TableCell>
                                    <TableCell>Items</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {superTitles.map((superTitle, superTitleIndex) => (
                                    <TableRow key={superTitleIndex}>
                                        <TableCell>{superTitle.superTitle}</TableCell>
                                        <TableCell>
                                            {superTitle.attributes.map((attribute, attributeIndex) => (
                                                <div key={attributeIndex}>
                                                    <strong>{attribute.attribute}</strong>
                                                    <ul>
                                                        {attribute.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <strong>{item.title}</strong>
                                                                <ul>
                                                                    {item.bulletPoints.map((bulletPoint, bulletPointIndex) => (
                                                                        <li key={bulletPointIndex}>{bulletPoint}</li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Section>

                <Section>
                    <SectionTitle>Video</SectionTitle>
                    <FormGroup>
                        <Tooltip title="Upload a video">
                            <Label htmlFor="video">Video:</Label>
                        </Tooltip>
                        <Input type="file" id="video" onChange={handleVideoUpload} />
                    </FormGroup>
                </Section>

                <Section>
                    <SectionTitle>Subtitles</SectionTitle>
                    {subtitles.map((subtitle, subtitleIndex) => (
                        <div key={subtitleIndex}>
                            <FormGroup>
                                <Tooltip title="Enter the subtitle title">
                                    <Label htmlFor={`subtitle-title-${subtitleIndex}`}>Subtitle Title:</Label>
                                </Tooltip>
                                <Input
                                    type="text"
                                    id={`subtitle-title-${subtitleIndex}`}
                                    value={subtitle.title}
                                    onChange={(e) => handleSubtitleChange(subtitleIndex, 'title', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Tooltip title="Upload a subtitle image">
                                    <Label htmlFor={`subtitle-image-${subtitleIndex}`}>Subtitle Image:</Label>
                                </Tooltip>
                                <Input type="file" id={`subtitle-image-${subtitleIndex}`} onChange={(e) => handleImageUpload(e, (url) => {
                                    const newSubtitles = [...subtitles];
                                    newSubtitles[subtitleIndex].image = url;
                                    setSubtitles(newSubtitles);
                                })} />
                            </FormGroup>
                            {subtitle.bulletPoints.map((bulletPoint, pointIndex) => (
                                <div key={pointIndex}>
                                    <FormGroup>
                                        <Tooltip title="Enter a bullet point text">
                                            <Label htmlFor={`bulletPoint-${subtitleIndex}-${pointIndex}`}>Bullet Point Text:</Label>
                                        </Tooltip>
                                        <Input
                                            type="text"
                                            id={`bulletPoint-${subtitleIndex}-${pointIndex}`}
                                            value={bulletPoint.text}
                                            onChange={(e) => handleBulletPointChange(subtitleIndex, pointIndex, 'text', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Upload a bullet point image">
                                            <Label htmlFor={`bulletPoint-image-${subtitleIndex}-${pointIndex}`}>Bullet Point Image:</Label>
                                        </Tooltip>
                                        <Input type="file" id={`bulletPoint-image-${subtitleIndex}-${pointIndex}`} onChange={(e) => handleImageUpload(e, (url) => {
                                            const newSubtitles = [...subtitles];
                                            newSubtitles[subtitleIndex].bulletPoints[pointIndex].image = url;
                                            setSubtitles(newSubtitles);
                                        })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Enter a code snippet">
                                            <Label htmlFor={`codeSnippet-${subtitleIndex}-${pointIndex}`}>Code Snippet:</Label>
                                        </Tooltip>
                                        <TextArea
                                            id={`codeSnippet-${subtitleIndex}-${pointIndex}`}
                                            value={bulletPoint.codeSnippet}
                                            onChange={(e) => handleBulletPointChange(subtitleIndex, pointIndex, 'codeSnippet', e.target.value)}
                                        />
                                    </FormGroup>
                                </div>
                            ))}
                            <Button type="button" onClick={() => addBulletPoint(subtitleIndex)}>Add Bullet Point</Button>
                        </div>
                    ))}
                    <Button type="button" onClick={addSubtitle}>Add Subtitle</Button>
                </Section>

                <Section>
                    <SectionTitle>Summary</SectionTitle>
                    <FormGroup>
                        <Tooltip title="Enter a summary of your post">
                            <Label htmlFor="summary">Summary:</Label>
                        </Tooltip>
                        <TextArea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} required></TextArea>
                   
                    </FormGroup>
                </Section>

                <Section>
                    <Button type="submit">Submit Post</Button>
                </Section>
            </form>
        </FormContainer>
    );
};

export default AddPostForm;
