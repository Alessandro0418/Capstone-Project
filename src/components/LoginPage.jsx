import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token salvato:", token);
        navigate("/dashboard");
      } else {
        setError(
          "Login riuscito, ma nessun token ricevuto. Contattare l'amministratore."
        );
        console.error("Risposta di login senza token:", response.data);
      }
    } catch (err) {
      console.error(err);
      setError("Login fallito. Verifica username e password.");
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center bg-registration"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <div
            className="p-4 shadow rounded-4"
            style={{
              backgroundColor: "white",
              border: "1px solid #dee2e6",
            }}
          >
            <h2 className="custom-txt-color text-center mb-6">
              PERSONAL BUDGET MANAGER
            </h2>
            <h2 className="custom-txt-color ms-2 mb-4">Login</h2>

            {/* ALERT PER ERRORE NELL'INSERIMENTO DEI DATI*/}
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid d-flex justify-content-center align-items-center">
                <Button className="btn-custom w-50 p-2" type="submit">
                  Log In
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
