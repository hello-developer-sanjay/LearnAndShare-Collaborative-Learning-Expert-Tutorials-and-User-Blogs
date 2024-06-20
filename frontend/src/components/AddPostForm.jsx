import React, { useState } from 'react';
import styled from 'styled-components';
import { Tooltip, IconButton } from '@material-ui/core';

const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    min-height: 100px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Section = styled.div`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
`;

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [titleImage, setTitleImage] = useState(null);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [superTitles, setSuperTitles] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const [summary, setSummary] = useState('');
    const [video, setVideo] = useState(null);

    const categories = ['Category 1', 'Category 2', 'Category 3']; // example categories

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSuperTitleChange = (index, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[index][field] = value;
        setSuperTitles(newSuperTitles);
    };

    const handleAttributeChange = (superTitleIndex, attributeIndex, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex][field] = value;
        setSuperTitles(newSuperTitles);
    };

    const handleItemChange = (superTitleIndex, attributeIndex, itemIndex, field, value) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex].items[itemIndex][field] = value;
        setSuperTitles(newSuperTitles);
    };

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

    const addSuperTitle = () => {
        setSuperTitles([...superTitles, { superTitle: '', attributes: [] }]);
    };

    const addAttribute = (superTitleIndex) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes.push({ attribute: '', items: [] });
        setSuperTitles(newSuperTitles);
    };

    const addItem = (superTitleIndex, attributeIndex) => {
        const newSuperTitles = [...superTitles];
        newSuperTitles[superTitleIndex].attributes[attributeIndex].items.push({ title: '', bulletPoints: [] });
        setSuperTitles(newSuperTitles);
    };

    const addBulletPoint = (subtitleIndex) => {
        const newSubtitles = [...subtitles];
        newSubtitles[subtitleIndex].bulletPoints.push({ text: '', image: null, codeSnippet: '' });
        setSubtitles(newSubtitles);
    };

    const addSubtitle = () => {
        setSubtitles([...subtitles, { title: '', bulletPoints: [], image: null }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <Section>
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
                    <SectionTitle>Comparison Table</SectionTitle>
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
                                <Tooltip title="Enter the subtitle">
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
                                    <Label>Subtitle Image</Label>
                                </Tooltip>
                                <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, setSubtitles[index].image)} />
                            </FormGroup>
                            {subtitle.bulletPoints.map((bulletPoint, pointIndex) => (
                                <div key={pointIndex}>
                                    <FormGroup>
                                        <Tooltip title="Enter a bullet point">
                                            <Label>Bullet Point</Label>
                                        </Tooltip>
                                        <Input
                                            type="text"
                                            value={bulletPoint.text}
                                            onChange={e => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Upload an image for the bullet point">
                                            <Label>Bullet Point Image</Label>
                                        </Tooltip>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => handleImageUpload(e, setSubtitles[index].bulletPoints[pointIndex].image)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Tooltip title="Enter a code snippet for the bullet point">
                                            <Label>Code Snippet</Label>
                                        </Tooltip>
                                        <TextArea
                                            value={bulletPoint.codeSnippet}
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
                    <FormGroup>
                        <Tooltip title="Enter a summary for your post">
                            <Label>Summary</Label>
                        </Tooltip>
                        <TextArea value={summary} onChange={e => setSummary(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Tooltip title="Upload a video for your post">
                            <Label>Video</Label>
                        </Tooltip>
                        <Input type="file" accept="video/*" onChange={e => handleImageUpload(e, setVideo)} />
                    </FormGroup>
                </Section>

                <Button type="submit">Submit</Button>
            </form>
        </FormContainer>
    );
};

export default AddPostForm;
