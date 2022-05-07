import Layout from 'components/Layout/Layout';
import React from 'react';
import Sidebar from '../Sidebar';
import { StyledFriendLayout } from './styles';

const FriendsLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Layout>
        <StyledFriendLayout>
          <div className="friends-container">
            <Sidebar />
            <div className="friends-content">{children}</div>
          </div>
        </StyledFriendLayout>
      </Layout>
    </div>
  );
};

export default FriendsLayout;
