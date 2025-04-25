import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageRender from "./components/PageRender/PageRender";
import SignUP from "./components/Pages/SignUP";
import Login from "./components/Pages/Login";
import Reset from "./components/Pages/Reset";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import VideoPage from "./components/Pages/VideoPage";
import SearchPage from "./components/Pages/SearchPage";
import InfoPage from "./components/Pages/InfoPage";
import PrivateRoute from "./components/PageRender/PrivateRouter";
import PublicRoute from "./components/PageRender/PublicRouter";
import ShortsPage from "./components/Pages/ShortsPage";

const privateRoutes = [
  { path: "/homepage", element: <PageRender /> },
  { path: "/videopage", element: <VideoPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/info", element: <InfoPage /> },
  { path: "/shorts", element: <ShortsPage /> },
];

function App() {
  return (
    <div className="bg-black text-white min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute element={<SignUP />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/reset" element={<Reset />} />

          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute element={element} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
