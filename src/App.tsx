import Layout from 'components/Layout/Layout';
import RequireAuth from 'components/RequireAuth';
import { startConnecting, unConnect } from 'features/socketSlice';
import { useAppDispatch } from 'hooks/hooks';
import FogotPassword from 'pages/Auth/FogotPassword';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ResetPassword from 'pages/Auth/ResetPassword';
import Chat from 'pages/Chat';
import PopupChat from 'pages/Chat/components/PropupChat';
import Post from 'pages/Detail/Detail';
import Homepage from 'pages/Home';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile/Profile';
import SettingAccount from 'pages/SettingAccount';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === 'landing') {
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
      <PopupChat />
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
