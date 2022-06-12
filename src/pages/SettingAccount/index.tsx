import Container from 'components/Container/Container';
import React from 'react';
import SettingGeneral from './components/SettingGeneral/SettingGeneral';
import SettingSecurity from './components/SettingSecurity/SettingSecurity';
import { StyledSettingAccount } from './Styles';

const SettingAccount = () => {
  return (
    <StyledSettingAccount className="layout">
      <Container style={{ display: 'flex', flexDirection: 'column', rowGap: '3rem' }}>
        <SettingGeneral />
        <SettingSecurity />
      </Container>
    </StyledSettingAccount>
  );
};

export default SettingAccount;
