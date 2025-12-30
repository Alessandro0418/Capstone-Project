import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logoPBM from "../assets/PBM_logo.png";
function HomePage() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center bg-registration"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <div
            className={`p-4 shadow rounded-4 ${
              animate ? "animate-on-load" : ""
            }`}
            style={{
              backgroundColor: "white",
              border: "1px solid #dee2e6",
            }}
          >
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img
                className="ms-2 w-25"
                src={logoPBM}
                alt="Personal-Budget-Manager-Logo"
              />
            </div>
            <div className="d-flex mb-2">
              <h1 className="fw-bold d-flex flex-wrap dashboard-title justify-content-center align-items-center">
                <span className="me-2">Personal</span>
                <span className="me-2 custom-green-text">Budget</span>
                <span className="">Manager</span>
              </h1>
            </div>
            <h6 className="custom-txt-color ms-2 mb-4 text-center">
              Take control of your finances
            </h6>
            <div className="d-grid d-flex flex-column justify-content-center align-items-center gap-2">
              <Button
                className="btn-custom w-50 p-2"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Sign Up
              </Button>
              <Button
                className="btn-light border border-1 border-black w-50 p-2 mb-3"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                type="submit"
              >
                Log In
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
