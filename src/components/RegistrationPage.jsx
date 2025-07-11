import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
    avatar: "",
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
      await axios.post("http://localhost:8080/auth/register", formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registrazione fallita. Verifica i dati.");
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
            <h2 className="custom-txt-color ms-2 mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="text"
                  placeholder="Name"
                  name="nome"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="text"
                  placeholder="Surname"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Control
                  className="underline-input custom-placeholder"
                  type="text"
                  placeholder="Avatar URL (Optional)"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-grid d-flex justify-content-center align-items-center">
                <Button className="btn-custom w-50 p-2" type="submit">
                  Register
                </Button>
              </div>
              <div className="text-center mt-3">
                <span className="me-1">Already have an account?</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="text-decoration-none"
                  style={{ color: "#1b2025", fontWeight: "bold" }}
                >
                  Log In
                </a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationPage;
