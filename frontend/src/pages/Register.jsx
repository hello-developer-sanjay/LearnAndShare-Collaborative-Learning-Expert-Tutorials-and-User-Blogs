import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FormContainer = styled.div`
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(145deg, #262626, #333);
  box-shadow: 6px 6px 12px #1a1a1a, -6px -6px 12px #404040;
  width: 100%;
  max-width: 400px;
  animation: ${slideIn} 0.8s ease-out;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  background: #333;
  box-shadow: inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #404040;
  font-size: 1rem;
  color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  &:focus {
    box-shadow: inset 6px 6px 12px #1a1a1a, inset -6px -6px 12px #404040;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  background: #333;
  box-shadow: inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #404040;
  font-size: 1rem;
  color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  &:focus {
    box-shadow: inset 6px 6px 12px #1a1a1a, inset -6px -6px 12px #404040;
    outline: none;
  }
`;

const Button = styled.button`
  width: auto;
  padding: 0.5rem 1.5rem;
  background-color: #1a1a1a; /* Dark background color */
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease, box-shadow 0.3s ease-in-out; /* Added box-shadow transition */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Shining shadow effect */
  &:hover {
    background-color: #2a2a2a; /* Darker background color on hover */
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* Increased shadow intensity on hover */
  }
`;


const TogglePasswordButton = styled.button`
  position: absolute;
  top: 70%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // Add role field
  });

  const { name, email, password, confirmPassword, role } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    toast.info('Your full name will be displayed on the certificate as the bearer. Ensure your full name is entered correctly without any spelling mistakes. If there is any discrepancy, contact the Hogwarts Team.', {
      position: 'top-right',
      autoClose: 8000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    const response = await dispatch(register(formData));
    if (response.success) {
      toast.success(`Registration successful! Welcome, ${name}!`);
    } else {
      toast.error(response.message || 'Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your full name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <TogglePasswordButton onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </TogglePasswordButton>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            <TogglePasswordButton onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword? '🙈' : '👁️'}
</TogglePasswordButton>
</FormGroup>
<FormGroup>
<Label htmlFor="role">Role:</Label>
<Select
           id="role"
           name="role"
           value={role}
           onChange={handleChange}
           required
         >
<option value="">Select Role</option>
<option value="user">User</option>
<option value="admin">Admin</option>
</Select>
</FormGroup>
<Button type="submit">Register</Button>
</form>
</FormContainer>
</Container>
);
};

export default RegisterForm;


