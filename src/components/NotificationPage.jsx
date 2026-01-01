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

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("TUTTE");

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/notifiche", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Notifications Error", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8080/api/notifiche/${id}/letta`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, letta: true } : n))
      );
    } catch (err) {
      console.error("Notification update failed", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // filtraggio
  const filteredNotifications = notifications.filter((n) => {
    if (filter === "TUTTE") return true;
    return n.tipo === filter;
  });

  const getIcon = (tipo) => {
    switch (tipo) {
      case "AVVISO":
        return <i class="bi bi-exclamation-diamond-fill text-warning"></i>;
      case "SCADENZA":
        return <i class="bi bi-calendar2 text-primary"></i>;
      case "INFO":
        return <i class="bi bi-info-circle text-info"></i>;
      default:
        return <i class="bi bi-info-circle text-info"></i>;
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container className="py-4 mb-5">
      <h2 className="fw-bold mb-4 text-center pb-7 welcome-message">
        Notification Center
      </h2>

      {/* Filtri */}
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup className="shadow-sm">
          <Button
            variant={filter === "TUTTE" ? "success" : "light"}
            onClick={() => setFilter("TUTTE")}
          >
            All
          </Button>
          <Button
            variant={filter === "AVVISO" ? "warning" : "light"}
            onClick={() => setFilter("AVVISO")}
          >
            Important
          </Button>
          <Button
            variant={filter === "SCADENZA" ? "danger" : "light"}
            onClick={() => setFilter("SCADENZA")}
          >
            Deadlines
          </Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-5">
              <i class="bi bi-check-lg"></i>
              <h4 className="text-muted">Everything Under Control</h4>
              <p className="text-muted">
                You have no notifications in this section
              </p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <Card
                key={n.id}
                className={`mb-3 border-0 shadow-sm ${
                  !n.letta
                    ? "border-start border-success border-4"
                    : "opacity-75"
                }`}
                style={{ borderRadius: "15px" }}
              >
                <Card.Body className="d-flex align-items-start p-3">
                  <div className="me-3 mt-1">{getIcon(n.tipo)}</div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6
                        className={`mb-1 ${
                          !n.letta ? "fw-bold" : "text-muted"
                        }`}
                      >
                        {n.titolo}
                      </h6>
                      <small className="text-muted">
                        {moment(n.dataCreazione).fromNow()}
                      </small>
                    </div>
                    <p className="small text-muted mb-2">{n.messaggio}</p>
                    {!n.letta && (
                      <Button
                        variant="link"
                        className="p-0 text-success text-decoration-none small fw-bold"
                        onClick={() => markAsRead(n.id)}
                      >
                        Segna come letta
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}
