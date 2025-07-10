import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect automatico da "/" a "/register" */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
