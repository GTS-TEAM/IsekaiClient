import React, { useEffect, useState } from 'react';
import { isekaiApi } from '../../api/isekaiApi';
import { useParams } from 'react-router-dom';
import { StyledProfile, User } from './Styles';
import { Layout } from 'components';
import CoverImg from './components/CoverImg/CoverImg';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const data = await isekaiApi.getUser(id);
      setUser(data);
    };
    getUser();
  }, [id]);
  return (
    <Layout>
      <StyledProfile>
        <CoverImg imgBgUrl={user.background} userImg={user.profilePicture} userId={user.id} />
        <ProfileMenu />
        <User>
          <h2>{user.username}</h2>
          <p>3.2k Bạn bè</p>
        </User>
      </StyledProfile>
    </Layout>
  );
};

export default Profile;
