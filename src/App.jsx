import "./global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Analytics from "./Pages/Analytics.jsx";
import Enquiries from "./Pages/Enquiries.jsx";
import Admissions from "./Pages/Admissions.jsx";
import Gallery from "./Pages/Gallery.jsx";
import Content from "./Pages/Content.jsx";
import Settings from "./Pages/Settings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./Pages/NotFound.jsx";

// Apply dark mode on app load
if (!document.documentElement.classList.contains("dark")) {
  document.documentElement.classList.add("dark");
}

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
      <Route path="/enquiries" element={<ProtectedRoute element={<Enquiries />} />} />
      <Route path="/admissions" element={<ProtectedRoute element={<Admissions />} />} />
      <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} />
      {/* <Route path="/content" element={<ProtectedRoute element={<Content />} />} /> */}
      <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;