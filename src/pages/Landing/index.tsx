import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector(authSelector);

  useEffect(() => {
    if (token.access_token) {
      navigate('/home');
    }
  }, [token.access_token, navigate]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Landing;
