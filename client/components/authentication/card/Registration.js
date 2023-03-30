import React from 'react';
import { Link } from 'react-router-dom';
import AuthCardLayout from 'layouts/AuthCardLayout';
import RegistrationForm from 'components/authentication/RegistrationForm';
import { Button } from 'react-bootstrap';

const Registration = () => {
  return (
    <AuthCardLayout>
      <h3>Register</h3>
      <RegistrationForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Registration;
