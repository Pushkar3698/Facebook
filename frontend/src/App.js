import { Login } from "./components/pages/login/Login";
import { Signup } from "./components/pages/signup/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { Feed } from "./components/pages/feed/Feed";
import { useSelector } from "react-redux";

function App() {
  const { isAuth, token } = useSelector((state) => state.reducer);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/feed"
          element={!isAuth ? <Navigate to={"/"} /> : <Feed token={token} />}
        />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
