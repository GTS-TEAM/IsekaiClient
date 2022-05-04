import Container from 'components/Container/Container';
import Layout from 'components/Layout/Layout';
import React from 'react';
import { StyledFriends } from './styles';
const Friends = () => {
  return (
    <Layout>
      <StyledFriends>
        <Container></Container>
      </StyledFriends>
    </Layout>
  );
};

export default Friends;
