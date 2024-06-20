import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/actions/postActions';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

const FormContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial, sans-serif';
  color: #333;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CardTitle = styled.h3`
  margin-bottom: 20px;
  font-family: 'Arial, sans-serif';
  color: #555;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-family: 'Arial, sans-serif';
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Arial, sans-serif';
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Arial, sans-serif';
  box-sizing: border-box;
  min-height: 100px;
`;

const AddButton = styled(motion.button)`
  background: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Arial, sans-serif';
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:active {
    background: #003f7f;
  }
`;

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('VS Code');
  const [subtitles, setSubtitles] = useState([{ title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
  const [summary, setSummary] = useState('');
  const [video, setVideo] = useState(null);
  const [superTitles, setSuperTitles] = useState([{ superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);

  const dispatch = useDispatch();
  const categories = ['VS Code', 'React', 'JavaScript', 'CSS', 'HTML']; // example categories
  const user = useSelector(state => state.auth.user);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubtitleChange = (index, key, value) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index][key] = value;
    setSubtitles(newSubtitles);
  };

  const handleBulletPointChange = (subtitleIndex, pointIndex, key, value) => {
    const newSubtitles = [...subtitles];
    newSubtitles[subtitleIndex].bulletPoints[pointIndex][key] = value;
    setSubtitles(newSubtitles);
  };

  const addBulletPoint = (index) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index].bulletPoints.push({ text: '', image: null, codeSnippet: '' });
    setSubtitles(newSubtitles);
  };

  const addSubtitle = () => {
    setSubtitles([...subtitles, { title: '', image: null, bulletPoints: [{ text: '', image: null, codeSnippet: '' }] }]);
  };

  const handleSuperTitleChange = (index, key, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[index][key] = value;
    setSuperTitles(newSuperTitles);
  };

  const handleAttributeChange = (superIndex, attrIndex, key, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex][key] = value;
    setSuperTitles(newSuperTitles);
  };

  const handleItemChange = (superIndex, attrIndex, itemIndex, key, value) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex].items[itemIndex][key] = value;
    setSuperTitles(newSuperTitles);
  };

  const addItem = (superIndex, attrIndex) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes[attrIndex].items.push({ title: '', bulletPoints: [''] });
    setSuperTitles(newSuperTitles);
  };

  const addAttribute = (superIndex) => {
    const newSuperTitles = [...superTitles];
    newSuperTitles[superIndex].attributes.push({ attribute: '', items: [{ title: '', bulletPoints: [''] }] });
    setSuperTitles(newSuperTitles);
  };

  const addSuperTitle = () => {
    setSuperTitles([...superTitles, { superTitle: '', attributes: [{ attribute: '', items: [{ title: '', bulletPoints: [''] }] }] }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              {titleImage &&               <img src={titleImage} alt="Title" width="100" style={{ marginTop: '10px' }} />}
            </FormGroup>
            <FormGroup>
              <Label>Video</Label>
              <Input
                type="file"
                onChange={handleVideoUpload}
              />
              {video && <video controls src={video} width="300" style={{ marginTop: '10px' }} />}
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardTitle>Content</CardTitle>
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
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </FormGroup>
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle>Subtitles</CardTitle>
            {subtitles.map((subtitle, index) => (
              <div key={index}>
                <FormGroup>
                  <Label>Subtitle</Label>
                  <Input
                    type="text"
                    placeholder="Subtitle"
                    value={subtitle.title}
                    onChange={e => handleSubtitleChange(index, 'title', e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Subtitle Image</Label>
                  <Input
                    type="file"
                    onChange={e => handleImageUpload(e, (image) => handleSubtitleChange(index, 'image', image))}
                  />
                  {subtitle.image && <img src={subtitle.image} alt="Subtitle" width="100" style={{ marginTop: '10px' }} />}
                </FormGroup>
                {subtitle.bulletPoints.map((point, pointIndex) => (
                  <div key={pointIndex}>
                    <FormGroup>
                      <Label>Bullet Point</Label>
                      <Input
                        type="text"
                        placeholder="Bullet Point"
                        value={point.text}
                        onChange={e => handleBulletPointChange(index, pointIndex, 'text', e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Bullet Point Image</Label>
                      <Input
                        type="file"
                        onChange={e => handleImageUpload(e, (image) => handleBulletPointChange(index, pointIndex, 'image', image))}
                      />
                      {point.image && <img src={point.image} alt="Bullet Point" width="100" style={{ marginTop: '10px' }} />}
                    </FormGroup>
                    <FormGroup>
                      <Label>Code Snippet</Label>
                      <TextArea
                        placeholder="Code Snippet"
                        value={point.codeSnippet}
                        onChange={e => handleBulletPointChange(index, pointIndex, 'codeSnippet', e.target.value)}
                        required
                      />
                    </FormGroup>
                  </div>
                ))}
                <FormGroup>
                  <AddButton
                    type="button"
                    onClick={() => addBulletPoint(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Add Bullet Point
                  </AddButton>
                </FormGroup>
              </div>
            ))}
            <FormGroup>
              <AddButton
                type="button"
                onClick={addSubtitle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Add Subtitle
              </AddButton>
            </FormGroup>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardTitle>Super Titles</CardTitle>
            {superTitles.map((superTitle, superTitleIndex) => (
              <div key={superTitleIndex}>
                <FormGroup>
                  <Label>Super Title</Label>
                  <Input
                    type="text"
                    placeholder="Super Title"
                    value={superTitle.superTitle}
                    onChange={e => handleSuperTitleChange(superTitleIndex, 'superTitle', e.target.value)}
                    required
                  />
                </FormGroup>
                {superTitle.attributes.map((attribute, attributeIndex) => (
                  <div key={attributeIndex}>
                    <FormGroup>
                      <Label>Attribute</Label>
                      <Input
                        type="text"
                        placeholder="Attribute"
                        value={attribute.attribute}
                        onChange={e => handleAttributeChange(superTitleIndex, attributeIndex, 'attribute', e.target.value)}
                        required
                      />
                    </FormGroup>
                    {attribute.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            value={item.title}
                            onChange={e => handleItemChange(superTitleIndex, attributeIndex, itemIndex, 'title', e.target.value)}
                            required
                          />
                        </FormGroup>
                        {item.bulletPoints.map((bulletPoint, bulletPointIndex) => (
                          <div key={bulletPointIndex}>
                            <FormGroup>
                              <Label>Bullet Point</Label>
                              <Input
                                type="text"
                                placeholder="Bullet Point"
                                value={bulletPoint}
                                onChange={e => {
                                  const newBulletPoints = [...superTitles[superTitleIndex].attributes[attributeIndex].items[itemIndex].bulletPoints];
                                  newBulletPoints[bulletPointIndex] = e.target.value;
                                  handleItemChange(superTitleIndex, attributeIndex, itemIndex, 'bulletPoints', newBulletPoints);
                                }}
                                required
                              />
                            </FormGroup>
                          </div>
                        ))}
                        <FormGroup>
                          <AddButton
                            type="button"
                            onClick={() => addItem(superTitleIndex, attributeIndex)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            Add Bullet Point
                          </AddButton>
                        </FormGroup>
                      </div>
                    ))}
                    <FormGroup>
                      <AddButton
                        type="button"
                        onClick={() => addAttribute(superTitleIndex)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Add Attribute
                      </AddButton>
                    </FormGroup>
                  </div>
                ))}
              </div>
            ))}
            <FormGroup>
              <AddButton
                type="button"
                onClick={addSuperTitle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Add Super Title
              </AddButton>
            </FormGroup>
          </Card>
        </GridContainer>

        <FormGroup>
          <AddButton
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </AddButton>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

export default AddPostForm;

