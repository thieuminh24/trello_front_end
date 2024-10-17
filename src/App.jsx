import Active from "./pages/active/active";
import Login from "./pages/Auth/login/Login";
import Register from "./pages/Auth/register/register";
import Broad from "./pages/Broads/_id";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedPage } from "./pages/Protected/protected";
import Profile from "./pages/Profile/Profile";
import { useEffect } from "react";
import { loadUser } from "./redux/action/user";
import { useDispatch } from "react-redux";
import WorkSpace from "./pages/WorkSpace/WorkSpace";
import loadBoards from "./redux/action/boards";
import { intitialSocket } from "./redux/action/socket";

function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(intitialSocket());
    dispatch(loadUser());
    dispatch(loadBoards(userId));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/board/:id"
          element={
            <ProtectedPage>
              {" "}
              <Broad />
            </ProtectedPage>
          }
        ></Route>
        <Route
          path="/workSpace"
          element={
            <ProtectedPage>
              {" "}
              <WorkSpace />
            </ProtectedPage>
          }
        ></Route>
        {/* <Route path="/" element={}></Route> */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/activate/:active_token" element={<Active />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedPage>
              {" "}
              <Profile />
            </ProtectedPage>
          }
        ></Route>
      </Routes>
      {/* <Broad></Broad> */}
    </BrowserRouter>
  );
}

export default App;
