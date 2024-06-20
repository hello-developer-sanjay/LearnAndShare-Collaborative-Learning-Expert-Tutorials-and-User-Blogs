import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/postActions';
import { loadUser } from '../actions/authActions';
import axios from 'axios';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    margin-right: 20px;
    flex: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 2;

  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  margin-bottom: 15px;
  color: #555;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

  const addSuperTitle = () => {
    setSuperTitles([...superTitles, { superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
  };

  const addAttribute = (superTitleIndex) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superTitleIndex].attributes.push({ attribute: '', items: [{ title: '', bulletPoints: [''] }] });
    setSuperTitles(newSuperTitles);
  };

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
      const sanitizedContent = DOMPurify.sanitize(content);
      const sanitizedSummary = DOMPurify.sanitize(summary);
      dispatch(addPost(title, titleImage, sanitizedContent, category, subtitles, sanitizedSummary, video, user._id, superTitles));
      setTitle('');
      setContent('');
      setCategory('VS Code');
      setSubtitles([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
      setSummary('');
      setVideo(null);
      setSuperTitles([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <FormContainer>
      <Title>Add New Post</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="titleImage">Title Image:</Label>
          <Input
            type="file"
            id="titleImage"
            onChange={(e) => handleImageUpload(e, setTitleImage)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Content:</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category:</Label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="summary">Summary:</Label>
          <TextArea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="video">Video:</Label>
          <Input
            type="file"
            id="video"
            onChange={handleVideoUpload}
          />
        </FormGroup>

        <FormGroup>
          <Label>Super Titles:</Label>
          {superTitles.map((superTitle, superTitleIndex) => (
            <div key={superTitleIndex}>
              <Input
                type="text"
                value={superTitle.superTitle}
                onChange={(e) => handleSuperTitleChange(superTitleIndex, 'superTitle', e.target.value)}
                placeholder="Super Title"
              />
              {superTitle.attributes.map((attribute, attributeIndex) => (
                <div key={attributeIndex}>
                  <Input
                    type="text"
                    value={attribute.attribute}
                    onChange={(e) => handleAttributeChange(superTitleIndex, attributeIndex, 'attribute', e.target.value)}
                    placeholder="Attribute"
                  />
                  {attribute.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <Input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange(superTitleIndex, attributeIndex, itemIndex, 'title', e.target.value)}
                        placeholder="Item Title"
                      />
                      {item.bulletPoints.map((bulletPoint, bulletPointIndex) => (
                        <Input
                          key={bulletPointIndex}
                          type="text"
                          value={bulletPoint}
                          onChange={(e) => handleItemChange(superTitleIndex, attributeIndex, itemIndex, 'bulletPoints', e.target.value)}
                          placeholder="Bullet Point"
                        />
                      ))}
                    </div>
                  ))}
                  <Button type="button" onClick={() => addItem(superTitleIndex, attributeIndex)}>Add Item</Button>
                </div>
              ))}
              <Button type="button" onClick={() => addAttribute(superTitleIndex)}>Add Attribute</Button>
            </div>
          ))}
          <Button type="button" onClick={addSuperTitle}>Add Super Title</Button>
        </FormGroup>

        <Button type="submit">Add Post</Button>
      </form>

      <GridContainer>
        {subtitles.map((subtitle, index) => (
          <Card key={index}>
            <CardTitle>{subtitle.title}</CardTitle>
            <FormGroup>
              <Label>Subtitle Title:</Label>
              <Input
                type="text"
                value={subtitle.title}
                onChange={(e) => handleSubtitleChange(index, 'title', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Subtitle Image:</Label>
              <Input
                type="file"
                onChange={(e) => handleImageUpload(e, (image) => handleSubtitleChange(index, 'image', image))}
              />
            </FormGroup>

            {subtitle.bulletPoints.map((point, pointIndex) => (
              <div key={pointIndex}>
                <FormGroup>
                  <Label>Bullet Point Text:</Label>
                  <Input
                    type="text"
                    value={point.text}
                    onChange={(e) => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Bullet Point Image:</Label>
                  <Input
                    type="file"
                    onChange={(e) => handleImageUpload(e, (image) => handleBulletPointChange(index, pointIndex, 'image', image))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Code Snippet:</Label>
                  <TextArea
                    value={point.codeSnippet}
                    onChange={(e) => handleBulletPointChange(index, pointIndex, 'codeSnippet', e.target.value)}
                  />
                </FormGroup>
              </div>
            ))}
            <AddButton type="button" onClick={() => addBulletPoint(index)}>Add Bullet Point</AddButton>
          </Card>
        ))}
      </GridContainer>
      <AddButton type="button" onClick={addSubtitle}>Add Subtitle</AddButton>
    </FormContainer>
  );
};

export default AddPostForm;
