import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/authActions';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHome } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 2rem;
`;

const LoginForm = styled.form`
  background: linear-gradient(135deg, #8a2387, #e94057, #f27121);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  transform: perspective(1000px) rotateY(10deg);
  transition: transform 0.5s ease;
  &:hover {
    transform: perspective(1000px) rotateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  font-family: 'Cinzel Decorative', cursive;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-in-out;
`;
const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px solid #f27121;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  background-color: #fff;
  transition: border-color 0.3s;
  &:focus {
    border-color: #e94057;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #8a2387;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #f27121;
    transform: scale(1.05);
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0px;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #f27121;
`;

const ForgotPasswordLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    transition: all 0.5s ease;
    pointer-events: none; /* Ensure the pseudo-elements do not block pointer events */
  }

  &:before {
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #007BFF, #0056b3);
    visibility: hidden;
    transform: scaleX(0);
  }

  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }

  &:after {
    top: 0;
    left: 0;
    background: linear-gradient(to right, transparent, #0056b3, transparent);
    visibility: hidden;
    transform: scaleX(0);
  }

  &:hover:after {
    visibility: visible;
    transform: scaleX(1);
  }

  &:hover {
    text-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;



const HomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(login(email, password));
    setLoading(false);
    if (response.success) {
      toast.success('Login successful');
      if (response.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      toast.error(response.message || 'Invalid email or password');
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>HogwartsEdx</Title>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <ToggleIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
          />
        </PasswordContainer>
        <Button type="submit">
          {loading ? (
            <RingLoader color={'#ffffff'} loading={loading} size={30} />
          ) : (
            'Login'
          )}
        </Button>
        <ForgotPasswordLink to="/forgot-password">
          Forgot Password? Click to reset
        </ForgotPasswordLink>
      
      </LoginForm>
    </Container>
  );
};

export default Login;
