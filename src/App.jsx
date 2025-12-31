import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import { Container } from "react-bootstrap";
import "./App.css";
import MobileNavbar from "./components/MobileNavbar";
import ChartsPage from "./components/ChartsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect automatico da "/" a "/HomePage" */}
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
      <MobileNavbar />
    </BrowserRouter>
  );
}

export default App;
