import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import styled from 'styled-components';
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
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7f7f7;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    border-color: #495057;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  margin-top: 1rem;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #007bff;
  margin-top: 1rem;
`;

const HomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const Login = () => {
  const dispatch = useDispatch();
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
    try {
      const response = await dispatch(login(email, password));
      if (response.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Login successful');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to login. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
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
        <HomeLink to="/">
          <HomeIcon icon={faHome} />
          Home
        </HomeLink>
      </LoginForm>
      <ToastContainer />
    </Container>
  );
};

export default Login;
