import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function TransactionForm({ onTransactionAdded, categories }) {
  const [transactionData, setTransactionData] = useState({
    descrizione: "",
    importo: "",
    data: new Date().toISOString().split("T")[0],
    categoriaId: "",
    type: `EXPENSE`,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const getToken = () => localStorage.getItem("token");

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();
      if (!token) {
        setError("Token non trovato. Effettua il login.");
        return;
      }

      const payload = {
        ...transactionData,
        importo: parseFloat(transactionData.importo),
        categoriaId: parseInt(transactionData.categoriaId),
        expenses: [transactionData.type],
      };

      await axios.post("http://localhost:8080/api/transazioni", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Transaction successfully added!");
      setTransactionData({
        descrizione: "",
        importo: "",
        data: new Date().toISOString().split("T")[0],
        categoriaId: "",
        type: `EXPENSE`,
      });
      setTimeout(() => {
        if (onTransactionAdded) {
          onTransactionAdded();
        }
      }, 1000);
    } catch (err) {
      console.error(
        "Errore nell'aggiunta della transazione:",
        err.response ? err.response.data : err.message
      );
      setError("Errore nell'aggiunta della transazione. Riprova.");
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="p-3">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="descrizione"
          value={transactionData.descrizione}
          onChange={handleChange}
          required
          placeholder="Coffee, Salary, Rent..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="importo"
          value={transactionData.importo}
          onChange={handleChange}
          step="0.01"
          required
          placeholder="10.50"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="data"
          value={transactionData.data}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="categoriaId"
          value={transactionData.categoriaId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Transaction Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={transactionData.type}
          onChange={handleChange}
          required
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" className="btn-custom3">
        Add Transaction
      </Button>
    </Form>
  );
}

export default TransactionForm;
