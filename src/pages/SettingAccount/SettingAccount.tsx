import Container from 'components/Container/Container';
import Layout from 'components/Layout/Layout';
import React from 'react';
import SettingGeneral from './components/SettingGeneral/SettingGeneral';
import SettingSecurity from './components/SettingSecurity/SettingSecurity';
import { SettingAccountContainer } from './Styles';

const SettingAccount = () => {
  return (
    <Layout sx={{ padding: '3rem' }}>
      <Container style={{ display: 'flex', flexDirection: 'column', rowGap: '3rem' }}>
        <SettingAccountContainer>
          <SettingGeneral />
        </SettingAccountContainer>
        <SettingAccountContainer>
          <SettingSecurity />
        </SettingAccountContainer>
      </Container>
    </Layout>
  );
};

export default SettingAccount;
