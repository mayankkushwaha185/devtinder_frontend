import Body from "./component/Body";
import Login from "./component/Login";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./component/Profile";
import appStore from "./utils/appStore";
import Feed from "./component/Feed";
import Connections from "./component/Connections";
import Request from "./component/Request";
import SignUp from "./component/SignUp";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
