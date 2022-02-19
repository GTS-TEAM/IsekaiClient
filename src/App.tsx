import Layout from 'components/Layout/Layout';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import Chat from 'pages/Chat/Chat';
import Post from 'pages/Detail/Detail';
import Profile from 'pages/Profile/Profile';
import SettingAccount from 'pages/SettingAccount/SettingAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Homepage from './pages/Home/Homepage';
import Landing from './pages/Landing/Landing';
function App() {
  return (
    <Router>
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
  );
}

export default App;
