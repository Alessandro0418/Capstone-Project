import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Row className="mb-4">
        <h1 className="fw-bold">Personal Budget Manager</h1>
        <Col>
          <h2 className="text-primary">Dashboard</h2>
        </Col>
        {/*OffCanvas button*/}
        <Col className="d-flex justify-content-end">
          <Button onClick={handleShow} className="btn-custom2 me-1">
            <i class="bi bi-gear-fill fs-4 text-black"></i>
          </Button>
        </Col>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Settings</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Mettere lo switch per la dark mode ed altro...
          </Offcanvas.Body>
        </Offcanvas>
      </Row>
      {/* Saldo totale + entrate ed uscite */}
      <Row className="mb-4">
        <Col md={4}>
          {/* saldo totale */}
          <div className="p-3 bg-white shadow rounded">
            <h5>Current Balance</h5>
            <h3>€0,00</h3>
          </div>
        </Col>
        <Col md={8}>
          {/* entrate ed uscite (totale) */}
          <div className="p-3 bg-white shadow rounded d-flex justify-content-between">
            <div>
              <h6>Income</h6>
              <p className="text-success">€0,00</p>
            </div>
            <div>
              <h6>Expenses</h6>
              <p className="text-danger">€0,00</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* grafico spese + transazioni recenti */}
      <Row className="mb-4">
        <Col md={8}>
          {/* grafico */}
          <div className="p-3 bg-white shadow rounded h-100">
            <h5>Spending Trend</h5>
            {/* grafico qui */}
          </div>
        </Col>
        <Col md={4}>
          {/* transazioni recenti */}
          <div className="p-3 bg-white shadow rounded h-100">
            <h5>Recent Transactions</h5>
            {/* lista transazioni qui */}
          </div>
        </Col>
      </Row>

      {/* aggiungi transazione e/o categoria */}
      <Row>
        <Col md={6}>
          <div className="p-3 bg-white shadow rounded">
            <h5>Add Transaction</h5>
            {/* aggiunta transazioni qui */}
          </div>
        </Col>
        <Col md={6}>
          <div className="p-3 bg-white shadow rounded">
            <h5>Add Category</h5>
            {/* aggiunta categorie qui */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
