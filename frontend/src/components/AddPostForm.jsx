import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { addPost } from '../../actions/postActions';

const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
  max-width: 1200px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #777;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #007BFF;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  &:focus {
    outline: none;
    border-color: #007BFF;
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0056b3;
  }
  &:active {
    background: #004080;
  }
`;

const AddButton = styled(Button)`
  background: #28a745;
  &:hover {
    background: #218838;
  }
  &:active {
    background: #1e7e34;
  }
`;

const AddPostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [title, setTitle] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('VS Code');
  const [subtitles, setSubtitles] = useState([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
  const [summary, setSummary] = useState('');
  const [video, setVideo] = useState(null);
  const [superTitles, setSuperTitles] = useState([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
  const categories = ['VS Code', 'React', 'JavaScript', 'CSS', 'HTML'];

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

  const handleSuperTitleChange = (superIndex, field, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex][field] = value;
    setSuperTitles(newSuperTitles);
  };

  const handleAttributeChange = (superIndex, attrIndex, field, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex][field] = value;
    setSuperTitles(newSuperTitles);
  };

  const handleItemChange = (superIndex, attrIndex, itemIndex, field, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex].items[itemIndex][field] = value;
    setSuperTitles(newSuperTitles);
  };

  const addSubtitle = () => {
    setSubtitles([...subtitles, { title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
  };

  const addBulletPoint = (index) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index].bulletPoints.push({ text: '', image: null, codeSnippet: '' });
    setSubtitles(newSubtitles);
  };

  const addSuperTitle = () => {
    setSuperTitles([...superTitles, { superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
  };

  const addAttribute = (superIndex) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes.push({ attribute: '', items: [{ title: '', bulletPoints: [''] }] });
    setSuperTitles(newSuperTitles);
  };

  const addItem = (superIndex, attrIndex) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex].items.push({ title: '', bulletPoints: [''] });
    setSuperTitles(newSuperTitles);
  };

  const handleSubmit = e => {
    e.preventDefault();
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
    <FormContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
              {titleImage && <img src={titleImage} alt="Title" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
            </FormGroup>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Content</CardTitle>
            <FormGroup>
              <Label>Content</Label>
              <TextArea
                rows="6"
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </FormGroup>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Category</CardTitle>
            <FormGroup>
              <Label>Category</Label>
              <Input
                as="select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Input>
            </FormGroup>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Subtitles</CardTitle>
            {subtitles.map((subtitle, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormGroup>
                  <Label>Subtitle</Label>
                  <Input
                    type="text"
                    placeholder="Subtitle"
                    value={subtitle.title}
                    onChange={e => handleSubtitleChange(index, 'title', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Subtitle Image</Label>
                  <Input
                    type="file"
                    onChange={e => handleImageUpload(e, image => handleSubtitleChange(index, 'image', image))}
                  />
                  {subtitle.image && <img src={subtitle.image} alt="Subtitle" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
                </FormGroup>
                {subtitle.bulletPoints.map((point, pointIndex) => (
                  <FormGroup key={pointIndex}>
                    <Label>Bullet Point {pointIndex + 1}</Label>
                    <Input
                      type="text"
                      placeholder="Bullet Point Text"
                      value={point.text}
                      onChange={e => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                    />
                    <Input
                      type="file"
                      onChange={e => handleImageUpload(e, image => handleBulletPointChange(index, pointIndex, 'image', image))}
                    />
                    {point.image && <img src={point.image} alt={`Bullet Point ${pointIndex + 1}`} style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
                    <TextArea
                      rows="3"
                      placeholder="Code Snippet"
                      value={point.codeSnippet}
                      onChange={e => handleBulletPointChange(index, pointIndex, 'codeSnippet', e.target.value)}
                    />
                  </FormGroup>
                ))}
                <Button type="button" onClick={() => addBulletPoint(index)}>Add Bullet Point</Button>
              </Card>
            ))}
            <Button type="button" onClick={addSubtitle}>Add Subtitle</Button>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Summary & Video</CardTitle>
            <FormGroup>
              <Label>Summary</Label>
              <TextArea
                rows="4"
                placeholder="Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Video</Label>
              <Input
                type="file"
                onChange={handleVideoUpload}
              />
              {video && <video controls src={video} style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
            </FormGroup>
          </Card>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle>Super Titles</CardTitle>
            {superTitles.map((superTitle, superIndex) => (
              <Card
                key={superIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormGroup>
                  <Label>Super Title</Label>
                  <Input
                    type="text"
                    placeholder="Super Title"
                    value={superTitle.superTitle}
                    onChange={e => handleSuperTitleChange(superIndex, 'superTitle', e.target.value)}
                  />
                </FormGroup>
                {superTitle.attributes.map((attribute, attrIndex) => (
                  <Card
                    key={attrIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FormGroup>
                      <Label>Attribute</Label>
                      <Input
                        type="text"
                        placeholder="Attribute"
                        value={attribute.attribute}
                        onChange={e => handleAttributeChange(superIndex, attrIndex, 'attribute', e.target.value)}
                      />
                    </FormGroup>
                    {attribute.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FormGroup>
                          <Label>Item Title</Label>
                          <Input
                            type="text"
                            placeholder="Item Title"
                            value={item.title}
                            onChange={e => handleItemChange(superIndex, attrIndex, itemIndex, 'title', e.target.value)}
                          />
                        </FormGroup>
                        {item.bulletPoints.map((bp, bpIndex) => (
                          <FormGroup key={bpIndex}>
                            <Label>Bullet Point {bpIndex + 1}</Label>
                            <Input
                              type="text"
                              placeholder="Bullet Point"
                              value={bp}
                              onChange={e => {
                                const newSuperTitles = [...superTitles];
                                newSuperTitles[superIndex].attributes[attrIndex].items[itemIndex].bulletPoints[bpIndex] = e.target.value;
                                setSuperTitles(newSuperTitles);
                              }}
                            />
                          </FormGroup>
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
