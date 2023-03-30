import React from 'react';
//import { Link } from 'react-router-dom';
import AuthCardLayout from '../../layouts/AuthCardLayout';
import RegistrationForm from '../../components/authenication/RegistrationForm';

import { Button } from 'react-bootstrap';

export default () => {
  return (
    <AuthCardLayout>
      <h3>Register</h3>
      <RegistrationForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};
