import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteGuard from "./utils/RouteGuard";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";
import Messenger from "./pages/Messenger";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Messenger />} />
        <Route element={<RouteGuard />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
