import Container from 'components/Container/Container';
import Layout from 'components/Layout/Layout';
import React from 'react';
import SettingGeneral from './components/SettingGeneral/SettingGeneral';
import SettingSecurity from './components/SettingSecurity/SettingSecurity';
import { StyledSettingAccount } from './Styles';

const SettingAccount = () => {
  return (
    <Layout>
      <StyledSettingAccount className="layout">
        <Container style={{ display: 'flex', flexDirection: 'column', rowGap: '3rem' }}>
          <SettingGeneral />
          <SettingSecurity />
        </Container>
      </StyledSettingAccount>
    </Layout>
  );
};

export default SettingAccount;
