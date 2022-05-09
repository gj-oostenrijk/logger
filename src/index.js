import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  // BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import About from "./routes/About";
import Stool from "./routes/Stool";
import NoMatch from "./routes/NoMatch";
import Users from "./routes/Users";
import "./index.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./routes/RequireAuth";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={
            <RequireAuth redirectTo="/login">
              <Dashboard />
            </RequireAuth>
            } />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="update-profile" element={
            <RequireAuth redirectTo="/login">
              <UpdateProfile />
            </RequireAuth>
            } />
          <Route path="stool" element={<Stool />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />}
          />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
