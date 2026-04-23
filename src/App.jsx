import "./global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Dashboard, Analytics, Enquiries, Admissions, Gallery, Content, Settings, NotFound } from "./pages";
import { ProtectedRoute } from "./components";
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
      <Route path="/content" element={<ProtectedRoute element={<Content />} />} />
      <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;