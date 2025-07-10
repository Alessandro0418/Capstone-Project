import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    cognome: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", formData); // aggiorna la porta se diversa
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registrazione fallita. Verifica i dati.");
    }
  };

  return <Container></Container>;
}

export default RegistrationPage;
