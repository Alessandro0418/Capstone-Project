import { useEffect, useState } from "react";
import "./MobileNavbar.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AiPage() {
  return (
    <Container className="py-4 mb-5">
      <h2 className="fw-bold mb-4 text-center pb-7 welcome-message">
        Integrated AI is coming soon…
      </h2>
      <div className="d-flex justify-content-center align-items-start">
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(0, 123, 255, 0.2)",
            position: "relative",
            animation: "pulse 2s infinite",
            marginBottom: "3rem",
          }}
          className="ai-placeholder-circle"
        >
          <i
            className="bi bi-robot text-primary opacity-50"
            style={{ fontSize: "3rem" }}
          ></i>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-muted text-center" style={{ maxWidth: "400px" }}>
          Integrated AI will soon be available to help you manage your finances,
          provide personalized advice, and much more.
        </p>
      </div>
    </Container>
  );
}
