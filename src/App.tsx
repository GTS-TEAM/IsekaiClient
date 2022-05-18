import Layout from 'components/Layout/Layout';
import RequireAuth from 'components/RequireAuth';
import Toast from 'components/Toast';
import { authSelector } from 'features/authSlice';
import { startConnecting, unConnect } from 'features/socketSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import FogotPassword from 'pages/Auth/FogotPassword';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ResetPassword from 'pages/Auth/ResetPassword';
import Chat from 'pages/Chat';
import Post from 'pages/Detail/Detail';
import AllFriend from 'pages/Friends/components/AllFriend';
import FriendsLayout from 'pages/Friends/components/FriendsLayout';
import Home from 'pages/Friends/components/Home';
import Request from 'pages/Friends/components/Request';
import Suggest from 'pages/Friends/components/Suggest';
import Homepage from 'pages/Home';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile/Profile';
import SettingAccount from 'pages/SettingAccount';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(authSelector);

  useEffect(() => {
    if (!token.access_token) {
      return;
    } else {
      dispatch(startConnecting());
    }

    return () => {
      dispatch(unConnect());
    };
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Toast />
      <Routes>
        <Route path="/lading" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<FogotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/reset-password?token=:tokenURL" element={<ResetPassword />} /> */}

        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="setting" element={<SettingAccount />} />
          <Route path="message" element={<Chat />} />
          <Route path="message/:id" element={<Chat />} />
          <Route path="friends">
            <Route
              index={true}
              element={
                <FriendsLayout>
                  <Home />
                </FriendsLayout>
              }
            />
            <Route
              path="request"
              element={
                <FriendsLayout>
                  <Request />
                </FriendsLayout>
              }
            />
            <Route
              path="suggest"
              element={
                <FriendsLayout>
                  <Suggest />
                </FriendsLayout>
              }
            />
            <Route
              path="all-friends"
              element={
                <FriendsLayout>
                  <AllFriend />
                </FriendsLayout>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<p>Not found</p>} />
        {/* 
        <Route path="/login/identify">
          {token.access_token ? <Redirect to="/" /> : <BasicCard />}
        </Route>
        <Route path="/login">
          {token.access_token ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {token.access_token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path={["/messenger/:id", "/messenger"]}>
          {!token.access_token ? <Redirect to="/" /> : <Messager />}
        </Route>
        <Route path="/profile/:id">
          {!token.access_token ? <Redirect to="/" /> : <Profile />}
        </Route>
        <Route path="/signup/validate">
          <BasicCard />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
