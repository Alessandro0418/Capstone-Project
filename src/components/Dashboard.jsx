import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TransactionForm from "./TransactionForm";
import CategoryForm from "./CategoryForm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleShowTransactionModal = () => setShowTransactionModal(true);
  const handleCloseTransactionModal = () => setShowTransactionModal(false);
  const handleShowCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const [categories, setCategories] = useState([]);

  const [riepilogoMensile, setRiepilogoMensile] = useState(null);
  const [totaliPerCategoria, setTotaliPerCategoria] = useState([]);
  const [transazioniRecenti, setTransazioniRecenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mese, setMese] = useState(new Date().getMonth() + 1);
  const [anno, setAnno] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();
    if (!token) {
      setError("Token di autenticazione non trovato. Effettua il login.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          mese,
          anno,
        },
      };

      // riepilogo mensile
      const riepilogoRes = await axios.get(
        `http://localhost:8080/api/dashboard/riepilogo-mensile`,
        config
      );
      setRiepilogoMensile(riepilogoRes.data);

      // totali per categoria
      const categorieRes = await axios.get(
        `http://localhost:8080/api/dashboard/per-categoria`,
        config
      );
      const filteredExpenses = categorieRes.data.filter(
        (item) => item.expenses && item.expenses.includes("EXPENSE")
      );

      // tutte le transazioni
      const transazioniRes = await axios.get(
        `http://localhost:8080/api/transazioni`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // transazioni dalla più recente e prende le prime 5
      const recenti = transazioniRes.data
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 5);
      setTransazioniRecenti(recenti);

      const allCategoriesRes = await axios.get(
        `http://localhost:8080/api/categorie`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(allCategoriesRes.data);
    } catch (err) {
      console.error("Errore nel recupero dati dashboard:", err);
      setError(
        "Impossibile caricare i dati della dashboard. Riprova più tardi."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [mese, anno]);

  const handleTransactionAdded = () => {
    fetchDashboardData();
    handleCloseTransactionModal();
  };

  const handleCategoryAdded = () => {
    fetchDashboardData();
    handleCloseCategoryModal();
  };

  // grafico a torta (spese per categoria)
  const pieChartData = {
    labels: totaliPerCategoria.map((item) => item.categoria),
    datasets: [
      {
        data: totaliPerCategoria.map((item) => Math.abs(item.totale)),
        backgroundColor: totaliPerCategoria.map((item, index) => {
          const category = categories.find(
            (cat) => cat.name === item.categoria
          );
          return category && category.color
            ? category.color
            : `hsl(${index * 60}, 70%, 50%)`;
        }),
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spese per Categoria",
      },
    },
  };

  //selezione mese/anno
  const handleMonthChange = (e) => {
    setMese(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setAnno(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <Container
        fluid
        className="p-4 bg-light min-vh-100 d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return (
      <Container
        fluid
        className="p-4 bg-light min-vh-100 d-flex justify-content-center align-items-center"
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

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
            <i className="bi bi-gear-fill fs-4 text-black"></i>
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

      {/* Selector per Mese e Anno */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="selectMonth">
            <Form.Label>Mese</Form.Label>
            <Form.Control as="select" value={mese} onChange={handleMonthChange}>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {moment().month(i).format("MMMM")}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="selectYear">
            <Form.Label>Anno</Form.Label>
            <Form.Control as="select" value={anno} onChange={handleYearChange}>
              {[...Array(5).keys()].map((i) => {
                const y = new Date().getFullYear() - i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Saldo totale + entrate ed uscite */}
      <Row className="mb-4">
        <Col md={4}>
          {/* saldo totale */}
          <div className="p-3 bg-white shadow rounded">
            <h5>Current Balance</h5>
            <h3>
              €{riepilogoMensile ? riepilogoMensile.saldo.toFixed(2) : "0.00"}
            </h3>
          </div>
        </Col>
        <Col md={8}>
          {/* entrate ed uscite (totale) */}
          <div className="p-3 bg-white shadow rounded d-flex justify-content-between">
            <div>
              <h6>Income</h6>
              <p className="text-success">
                €
                {riepilogoMensile
                  ? riepilogoMensile.entrateTotali.toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <div>
              <h6>Expenses</h6>
              <p className="text-danger">
                €
                {riepilogoMensile
                  ? riepilogoMensile.usciteTotali.toFixed(2)
                  : "0.00"}
              </p>
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
            {totaliPerCategoria.length > 0 ? (
              <div style={{ height: "300px" }}>
                {" "}
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            ) : (
              <p className="text-muted">
                Nessuna spesa registrata per questo mese/anno.
              </p>
            )}
          </div>
        </Col>
        <Col md={4}>
          {/* transazioni recenti */}
          <div className="p-3 bg-white shadow rounded h-100">
            <h5>Recent Transactions</h5>
            {transazioniRecenti.length > 0 ? (
              <ul className="list-group list-group-flush">
                {transazioniRecenti.map((t) => (
                  <li
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{t.descrizione}</strong>
                      <br />
                      <small className="text-muted">
                        {moment(t.data).format("DD/MM/YYYY")}
                      </small>
                      {t.categoria && (
                        <span
                          className="ms-2 badge rounded-pill"
                          style={{
                            backgroundColor: t.categoria.color || "#6c757d",
                            color: "white",
                          }}
                        >
                          {t.categoria.name}
                        </span>
                      )}
                    </div>
                    <span
                      className={
                        t.expenses && t.expenses.includes("INCOME")
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      €{t.importo.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Nessuna transazione recente.</p>
            )}
          </div>
        </Col>
      </Row>

      {/* aggiungi transazione e/o categoria */}
      <Row>
        <Col md={6}>
          <div className="p-3 bg-white shadow rounded">
            <h5>Add Transaction</h5>
            <Button variant="primary" onClick={handleShowTransactionModal}>
              <i className="bi bi-plus-circle me-2"></i> Add New Transaction
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="p-3 bg-white shadow rounded">
            <h5>Add Category</h5>
            <Button variant="info" onClick={handleShowCategoryModal}>
              <i className="bi bi-tags me-2"></i> Add New Category
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showTransactionModal} onHide={handleCloseTransactionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Nuova Transazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            onTransactionAdded={handleTransactionAdded}
            categories={categories}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Nuova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm onCategoryAdded={handleCategoryAdded} />
        </Modal.Body>
      </Modal>

      {/*display all categories */}
      <h3 className="mt-4">Tutte le Categorie</h3>
      {categories.length > 0 ? (
        <ul className="list-group">
          {categories.map((c) => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {c.name}
              {c.color && (
                <span
                  className="ms-2"
                  style={{
                    backgroundColor: c.color,
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                  }}
                ></span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Alert variant="info" className="mt-3">
          Nessuna categoria disponibile. Aggiungine una!
        </Alert>
      )}
    </Container>
  );
}

export default Dashboard;
