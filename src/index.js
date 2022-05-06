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

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Stool />} />
          <Route path="stool" element={<Stool />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />
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
