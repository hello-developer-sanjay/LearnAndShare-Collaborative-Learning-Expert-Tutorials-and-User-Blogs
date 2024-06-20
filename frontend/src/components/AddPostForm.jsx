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
      const sanitizedContent = DOMPurify.sanitize(content);
      const sanitizedSummary = DOMPurify.sanitize(summary);
      dispatch(addPost(title, titleImage, sanitizedContent, category, subtitles, sanitizedSummary, video, user._id, superTitles));
      setTitle('');
      setContent('');
      setCategory('VS Code');
      setSubtitles([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
      setSummary('');
      setTitleImage(null);
      setVideo(null);
      setSuperTitles([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <FormContainer>
      <Title>Add Post</Title>
      <form onSubmit={handleSubmit}>
        <GridContainer>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Title & Media</CardTitle>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Title Image</Label>
              <Input
                type="file"
                onChange={e => handleImageUpload(e, setTitleImage)}
              />
              {titleImage && <img src={titleImage} alt="Title" width="100" />}
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardTitle>Content & Category</CardTitle>
            <FormGroup>
              <Label>Content</Label>
              <TextArea
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle>Video</CardTitle>
            <FormGroup>
              <Label>Video</Label>
              <Input
                type="file"
                onChange={handleVideoUpload}
              />
              {video && <video controls src={video} width="200" />}
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardTitle>Subtitles</CardTitle>
            {subtitles.map((subtitle, index) => (
              <Card key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <FormGroup>
                  <Label>Subtitle Title</Label>
                  <Input
                    type="text"
                    value={subtitle.title}
                    onChange={e => handleSubtitleChange(index, 'title', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Subtitle Image</Label>
                  <Input
                    type="file"
                    onChange={e => handleImageUpload(e, (image) => {
                      const newSubtitles = [...subtitles];
                      newSubtitles[index].image = image;
                      setSubtitles(newSubtitles);
                    })}
                  />
                  {subtitle.image && <img src={subtitle.image} alt="Subtitle" width="100" />}
                </FormGroup>
                {subtitle.bulletPoints.map((point, pointIndex) => (
                  <Card key={pointIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (pointIndex + 1) }}
                  >
                    <FormGroup>
                      <Label>Bullet Point Text</Label>
                      <TextArea
                        value={point.text}
                        onChange={e => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Bullet Point Image</Label>
                      <Input
                        type="file"
                        onChange={e => handleImageUpload(e, (image) => {
                          const newSubtitles = [...subtitles];
                          newSubtitles[index].bulletPoints[pointIndex].image = image;
                          setSubtitles(newSubtitles);
                        })}
                      />
                      {point.image && <img src={point.image} alt="Bullet Point" width="100" />}
                    </FormGroup>
                    <FormGroup>
                      <Label>Code Snippet</Label>
                      <TextArea
                        value={point.codeSnippet}
                        onChange={e => handleBulletPointChange(index, pointIndex, 'codeSnippet', e.target.value)}
                      />
                    </FormGroup>
                  </Card>
                ))}
                <Button type="button" onClick={() => addBulletPoint(index)}>Add Bullet Point</Button>
              </Card>
            ))}
            <Button type="button" onClick={addSubtitle}>Add Subtitle</Button>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardTitle>Summary</CardTitle>
            <FormGroup>
              <Label>Summary</Label>
              <TextArea
                placeholder="Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                required
              />
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CardTitle>Super Titles</CardTitle>
            {superTitles.map((superTitle, superIndex) => (
              <Card key={superIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (superIndex + 1) }}
              >
                <FormGroup>
                  <Label>Super Title</Label>
                  <Input
                    type="text"
                    value={superTitle.superTitle}
                    onChange={e => handleSuperTitleChange(superIndex, 'superTitle', e.target.value)}
                  />
                </FormGroup>
                {superTitle.attributes.map((attribute, attrIndex) => (
                  <Card key={attrIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (attrIndex + 1) }}
                  >
                    <FormGroup>
                      <Label>Attribute</Label>
                      <Input
                        type="text"
                        value={attribute.attribute}
                        onChange={e => handleAttributeChange(superIndex, attrIndex, 'attribute', e.target.value)}
                      />
                    </FormGroup>
                    {attribute.items.map((item, itemIndex) => (
                      <Card key={itemIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (itemIndex + 1) }}
                      >
                        <FormGroup>
                          <Label>Item Title</Label>
                          <Input
                            type="text"
                            value={item.title}
                            onChange={e => handleItemChange(superIndex, attrIndex, itemIndex, 'title', e.target.value)}
                          />
                        </FormGroup>
                        {item.bulletPoints.map((bullet, bulletIndex) => (
                          <Card key={bulletIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (bulletIndex + 1) }}
                          >
                            <FormGroup>
                              <Label>Bullet Point</Label>
                              <Input
                                type="text"
                                value={bullet}
                                onChange={e => {
                                  const newSuperTitles = [...superTitles];
                                  newSuperTitles[superIndex].attributes[attrIndex].items[itemIndex].bulletPoints[bulletIndex] = e.target.value;
                                  setSuperTitles(newSuperTitles);
                                }}
                              />
                            </FormGroup>
                          </Card>
                        ))}
                        <Button type="button" onClick={() => addItem(superIndex, attrIndex)}>Add Item</Button>
                      </Card>
                    ))}
                    <Button type="button" onClick={() => addAttribute(superIndex)}>Add Attribute</Button>
                  </Card>
                ))}
                <Button type="button" onClick={addSuperTitle}>Add Super Title</Button>
              </Card>
            ))}
          </Card>
        </GridContainer>
        <AddButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Add Post
        </AddButton>
      </form>
    </FormContainer>
  );
};

export default AddPostForm;
