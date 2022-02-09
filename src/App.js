import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Layout, RequireAuth } from './components';
import Homepage from './pages/Home/Homepage';
import './api/axoisClient';
import Profile from 'pages/Profile/Profile';
import Post from 'pages/Detail/Detail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
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
