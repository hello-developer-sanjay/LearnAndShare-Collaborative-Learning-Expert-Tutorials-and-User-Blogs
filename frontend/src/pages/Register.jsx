import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #495057;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #495057;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' // Add role field
  });

  const { name, email, password, role } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
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

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
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
              {showPassword ? 'Hide' : 'Show'}
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
