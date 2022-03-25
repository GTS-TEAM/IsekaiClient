import Layout from 'components/Layout/Layout';
import RequireAuth from 'components/RequireAuth';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import Chat from 'pages/Chat';
import PopupChat from 'pages/Chat/components/PropupChat';
import Post from 'pages/Detail/Detail';
import Homepage from 'pages/Home';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile/Profile';
import SettingAccount from 'pages/SettingAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <PopupChat />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
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
            path="/post"
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
      </Router>
    </>
  );
}

export default App;
