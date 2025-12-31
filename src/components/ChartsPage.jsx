import { useEffect, useState } from "react";
import "./MobileNavbar.css";
import { Form, Container, Row, Col, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ChartsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // dati grafici
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  // stato filtri
  const [mese, setMese] = useState(new Date().getMonth() + 1);
  const [anno, setAnno] = useState(new Date().getFullYear());

  const fetchChartsData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { mese, anno },
      };

      // dati per categoria
      const catRes = await axios.get(
        `http://localhost:8080/api/dashboard/per-categoria`,
        config
      );

      const formattedCats = catRes.data
        .filter((item) => item.expenses && item.expenses.includes("EXPENSE"))
        .map((item) => ({
          name: item.categoriaNome || "Altro",
          value: item.totale,
        }));
      setCategoryStats(formattedCats);

      // riepilogo mensile
      const riepilogoRes = await axios.get(
        `http://localhost:8080/api/dashboard/riepilogo-mensile`,
        config
      );

      setMonthlyTrend([
        {
          name: moment()
            .month(mese - 1)
            .format("MMM"),
          income: riepilogoRes.data.entrateTotali,
          expenses: riepilogoRes.data.usciteTotali,
        },
      ]);

      setError(null);
    } catch (err) {
      console.error("Errore nel caricamento dei grafici:", err);
      setError("Errore nel caricamento dei dati.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartsData();
  }, [mese, anno]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="p-4 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100 mb-5">
      <h2 className="fw-bold mb-4 text-center pb-7 welcome-message text-center">
        Financial Analytics
      </h2>

      {/* sezione fltri */}
      <Row className="mb-4 justify-content-center">
        <Col xs={6} md={2}>
          <Form.Group>
            <Form.Label className="small fw-bold">Month</Form.Label>
            <Form.Control
              as="select"
              value={mese}
              onChange={(e) => setMese(parseInt(e.target.value))}
            >
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {moment().month(i).format("MMMM")}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6} md={2}>
          <Form.Group>
            <Form.Label className="small fw-bold">Year</Form.Label>
            <Form.Control
              as="select"
              value={anno}
              onChange={(e) => setAnno(parseInt(e.target.value))}
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-4">
        {/* grafico ad area */}
        <Col xs={12} lg={8}>
          <Card
            className="p-3 shadow-sm border-0"
            style={{ backgroundColor: "#1b2025", color: "white" }}
          >
            <Card.Title className="mb-4">
              Income vs Expenses (
              {moment()
                .month(mese - 1)
                .format("MMMM")}
              )
            </Card.Title>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#444"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1b2025",
                      border: "1px solid #444",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#00C49F"
                    fill="#00C49F"
                    fillOpacity={0.3}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ff4d4d"
                    fill="#ff4d4d"
                    fillOpacity={0.3}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* chart pie per spese e categoria */}
        <Col xs={12} lg={4}>
          <Card
            className="p-3 shadow-sm border-0"
            style={{ backgroundColor: "#1b2025", color: "white" }}
          >
            <Card.Title className="mb-4">Expenses by Category</Card.Title>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {categoryStats.length === 0 && (
              <p className="text-center text-muted mt-2 small">
                No expense data for this period
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
