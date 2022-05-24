import React from 'react';
import Sidebar from '../Sidebar';
import { StyledFriendLayout } from './styles';

const FriendsLayout: React.FC = ({ children }) => {
  return (
    <StyledFriendLayout>
      <div className="friends-container">
        <Sidebar />
        <div className="friends-content">{children}</div>
      </div>
    </StyledFriendLayout>
  );
};

export default FriendsLayout;
