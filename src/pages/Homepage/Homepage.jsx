import React from 'react';
import { Header, Sidebar } from '../../components';
import './Homepage.scss';

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <Sidebar />
    </div>
  );
};

export default Homepage;
