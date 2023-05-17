import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RouteGuard from "./utils/RouteGuard";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";
import Messenger from "./pages/Messenger";
import { useToken } from "./store";
import $api, { API_URL } from "./http";
import { UserType } from "./types";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = useToken.getState();

    if (tokens.access.length > 0 && tokens.refresh.length > 0) {
      $api
        .get<UserType>(`${API_URL}/users/me`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${tokens.access}` },
        })
        .catch((_) => {
          useToken.setState({ access: "", refresh: "" });
          navigate("/signin");
        });
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RouteGuard />}>
          <Route path="/" element={<Messenger />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
