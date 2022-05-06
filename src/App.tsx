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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<FogotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/reset-password?token=:tokenURL" element={<ResetPassword />} /> */}

        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Layout>
                <Homepage />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/post/:id"
          element={
            <RequireAuth>
              <Post />
            </RequireAuth>
          }
        />
        <Route
          path="/setting"
          element={
            <RequireAuth>
              <SettingAccount />
            </RequireAuth>
          }
        />
        <Route
          path="/message"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route
          path="/message/:id"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route path="/friends">
          <Route
            index={true}
            element={
              <RequireAuth>
                <FriendsLayout>
                  <Home />
                </FriendsLayout>
              </RequireAuth>
            }
          />
          <Route
            path="request"
            element={
              <RequireAuth>
                <FriendsLayout>
                  <Request />
                </FriendsLayout>
              </RequireAuth>
            }
          />
          <Route
            path="suggest"
            element={
              <RequireAuth>
                <FriendsLayout>
                  <Suggest />
                </FriendsLayout>
              </RequireAuth>
            }
          />
          <Route
            path="all-friends"
            element={
              <RequireAuth>
                <FriendsLayout>
                  <AllFriend />
                </FriendsLayout>
              </RequireAuth>
            }
          />
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
