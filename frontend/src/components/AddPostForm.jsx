import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/postActions';
import { loadUser } from '../actions/authActions';
import axios from 'axios';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

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
    const [attributes, setAttributes] = useState([{ superTitle: '', attributes: [{ attributeName: '', titleItems: [{ title: '' }] }] }]);
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
            dispatch(addPost(title, content, category, sanitizedSubtitles, summary, titleImage,superTitles, video));
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
                            <Label>Title</Label>
                        </Tooltip>
                        <Input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Upload an image for the title of your post">
                            <Label>Title Image</Label>
                        </Tooltip>
                        <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, setTitleImage)} />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Enter the main content of your post">
                            <Label>Content</Label>
                        </Tooltip>
                        <TextArea value={content} onChange={e => setContent(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Select a category for your post">
                            <Label>Category</Label>
                        </Tooltip>
                        <Select value={category} onChange={e => setCategory(e.target.value)}>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Select>
                    </FormGroup>
                </Section>

                <Section>
                    <SectionTitle>Super Titles</SectionTitle>
                    {superTitles.map((superTitle, index) => (
                        <div key={index}>
                            <FormGroup>
                                <Tooltip title="Enter the super title">
                                    <Label>Super Title</Label>
                                </Tooltip>
                                <Input
                                    type="text"
                                    value={superTitle.superTitle}
                                    onChange={e => handleSuperTitleChange(index, 'superTitle', e.target.value)}
                                />
                            </FormGroup>
                            {superTitle.attributes.map((attribute, attributeIndex) => (
                                <div key={attributeIndex}>
                                    <FormGroup>
                                        <Tooltip title="Enter the attribute name">
                                            <Label>Attribute</Label>
                                        </Tooltip>
                                        <Input
                                            type="text"
                                            value={attribute.attribute}
                                            onChange={e => handleAttributeChange(index, attributeIndex, 'attribute', e.target.value)}
                                        />
                                    </FormGroup>
                                    {attribute.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <FormGroup>
                                                <Tooltip title="Enter the item title">
                                                    <Label>Title</Label>
                                                </Tooltip>
                                                <Input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={e => handleItemChange(index, attributeIndex, itemIndex, 'title', e.target.value)}
                                                />
                                            </FormGroup>
                                            {item.bulletPoints.map((bullet, bulletIndex) => (
                                                <FormGroup key={bulletIndex}>
                                                    <Tooltip title="Enter a bullet point">
                                                        <Label>Bullet Point</Label>
                                                    </Tooltip>
                                                    <Input
                                                        type="text"
                                                        value={bullet}
                                                        onChange={e => {
                                                            const newSuperTitles = [...superTitles];
                                                            newSuperTitles[index].attributes[attributeIndex].items[itemIndex].bulletPoints[bulletIndex] = e.target.value;
                                                            setSuperTitles(newSuperTitles);
                                                        }}
                                                    />
                                                </FormGroup>
                                            ))}
                                            <Tooltip title="Add a bullet point">
                                                <IconButton type="button" onClick={() => {
                                                    const newSuperTitles = [...superTitles];
                                                    newSuperTitles[index].attributes[attributeIndex].items[itemIndex].bulletPoints.push('');
                                                    setSuperTitles(newSuperTitles);
                                                }}>Add Bullet Point</IconButton>
                                            </Tooltip>
                                        </div>
                                    ))}
                                    <Tooltip title="Add an item">
                                        <IconButton type="button" onClick={() => addItem(index, attributeIndex)}>Add Item</IconButton>
                                    </Tooltip>
                                </div>
                            ))}
                            <Tooltip title="Add an attribute">
                                <IconButton type="button" onClick={() => addAttribute(index)}>Add Attribute</IconButton>
                            </Tooltip>
                        </div>
                    ))}
                    <Tooltip title="Add a super title">
                        <IconButton type="button" onClick={addSuperTitle}>Add Super Title</IconButton>
                    </Tooltip>
                </Section>

                <Section>
                    <SectionTitle>Subtitles</SectionTitle>
                    {subtitles.map((subtitle, index) => (
                        <div key={index}>
                            <FormGroup>
                                <Tooltip title="Enter the subtitle title">
                                    <Label>Title</Label>
                                </Tooltip>
                                <Input
                                    type="text"
                                    value={subtitle.title}
                                    onChange={e => handleSubtitleChange(index, 'title', e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Tooltip title="Upload an image for the subtitle">
                                    <Label>Image</Label>
                                </Tooltip>
                                <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, image => handleSubtitleChange(index, 'image', image))} />
                            </FormGroup>
                            {subtitle.bulletPoints.map((point, pointIndex) => (
                                <div key={pointIndex}>
                                    <FormGroup>
                                        <Tooltip title="Enter the bullet point text">
                                            <Label>Bullet Point Text</Label>
                                        </Tooltip>
                                        <Input
                                            type="text"
                                            value={point.text}
                                            onChange={e => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Upload an image for the bullet point">
                                            <Label>Image</Label>
                                        </Tooltip>
                                        <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, image => handleBulletPointChange(index, pointIndex, 'image', image))} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Enter the code snippet for the bullet point">
                                            <Label>Code Snippet</Label>
                                        </Tooltip>
                                        <TextArea
                                            value={point.codeSnippet}
                                            onChange={e => handleBulletPointChange(index, pointIndex, 'codeSnippet', e.target.value)}
                                        />
                                    </FormGroup>
                                </div>
                            ))}
                            <Tooltip title="Add a bullet point">
                                <IconButton type="button" onClick={() => addBulletPoint(index)}>Add Bullet Point</IconButton>
                            </Tooltip>
                        </div>
                    ))}
                    <Tooltip title="Add a subtitle">
                        <IconButton type="button" onClick={addSubtitle}>Add Subtitle</IconButton>
                    </Tooltip>
                </Section>

                <Section>
                    <SectionTitle>Summary</SectionTitle>
                    <FormGroup>
                        <Tooltip title="Enter the summary of your post">
                            <Label>Summary</Label>
                        </Tooltip>
                        <TextArea value={summary} onChange={e => setSummary(e.target.value)} required />
                    </FormGroup>
                </Section>

                <Section>
                    <SectionTitle>Video</SectionTitle>
                    <FormGroup>
                        <Tooltip title="Upload a video for your post">
                            <Label>Video</Label>
                        </Tooltip>
                        <Input type="file" accept="video/*" onChange={handleVideoUpload} />
                    </FormGroup>
                </Section>

                <Button type="submit">Submit</Button>
            </form>
        </FormContainer>
    );
};

export default AddPostForm;
