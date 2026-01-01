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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

export default function ChartsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [yearlyTrend, setYearlyTrend] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

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

      const [catRes, riepilogoRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/dashboard/per-categoria`, config),
        axios.get(
          `http://localhost:8080/api/dashboard/riepilogo-mensile`,
          config
        ),
      ]);

      const formattedCats = catRes.data.map((item) => ({
        name: item.categoria || "Senza Nome",
        value: Math.abs(parseFloat(item.totale)) || 0,
      }));

      setCategoryStats(formattedCats);

      const fullYearData = Array.from({ length: 12 }, (_, i) => {
        const monthName = moment().month(i).format("MMM");
        if (i + 1 === parseInt(mese)) {
          return {
            name: monthName,
            income: riepilogoRes.data.entrateTotali || 0,
            expenses: riepilogoRes.data.usciteTotali || 0,
          };
        }
        return { name: monthName, income: 0, expenses: 0 };
      });

      setYearlyTrend(fullYearData);
      setError(null);
    } catch (err) {
      console.error("Errore API:", err);
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

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="fw-bold mb-4 text-center pb-7 welcome-message text-center">
        Financial Analytics {anno}
      </h2>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <Card
            className="p-3 shadow-sm border-0"
            style={{ backgroundColor: "#eaeaebff", color: "black" }}
          >
            <Card.Title className="mb-4 text-center">
              Annual Income/Expenses Trend
            </Card.Title>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyTrend}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C49F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#eaeaebff",
                      border: "1px solid #444",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#00C49F"
                    fill="url(#colorInc)"
                    name="Entrate"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ff4d4d"
                    fill="url(#colorExp)"
                    name="Uscite"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card
            className="p-3 shadow-sm border-0"
            style={{ backgroundColor: "#eaeaebff", color: "black" }}
          >
            <Card.Title className="mb-4 text-center">
              Expenses by Category
            </Card.Title>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStats}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
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
              <p className="text-center text-muted small mt-2">
                Nessun dato per questo mese
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
