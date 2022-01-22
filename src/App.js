import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./pages/landing/Landing";
function App() {
  // const { token, dispatch, error } = useContext(AuthContext);
  // axios.interceptors.request.use(function (config) {
  //   const token = "Bearer " + JSON.parse(localStorage.getItem("access_token"));
  //   console.log("?");
  //   if (token !== "null") {
  //     config.headers.Authorization = token;
  //   }

  //   return config;
  // });
  // axios.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (e) => {
  //     let refreshToken = localStorage.getItem("refresh_token");
  //     const originalRequest = e.config;

  //     // da req refresh token
  //     if (originalRequest.url === "/auth/refresh-token") {
  //       console.log("Refresh token is expired");

  //       dispatch({ type: "LOGIN_FAILURE", payload: e });
  //       localStorage.clear();
  //     }
  //     // accesstoken expired check co refreshToken hay khong => req refreshtoken
  //     if (refreshToken !== "null" && e.response.status === 401) {
  //       refreshToken = JSON.parse(refreshToken);
  //       let response = await axios.post("/auth/refresh-token", {
  //         refreshToken,
  //       });
  //       localStorage.setItem(
  //         "access_token",
  //         JSON.stringify(response.data.access_token)
  //       );
  //       localStorage.setItem(
  //         "refresh_token",
  //         JSON.stringify(response.data.refresh_token)
  //       );
  //       return await axios(originalRequest);
  //     }
  //     throw e;
  //   }
  // );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        {/* <Route exact path="/">
          {token.access_token && !error ? <Home /> : <Login />}
        </Route>
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
