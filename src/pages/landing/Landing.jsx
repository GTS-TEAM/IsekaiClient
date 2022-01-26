import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../../features/authSlice';
import { Header, Hero } from './components';

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useSelector(authSelector);

  useEffect(() => {
    if (token.accessToken) {
      navigate('/home');
    }
  }, [token.accessToken, navigate]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Landing;
