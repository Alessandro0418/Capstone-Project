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
      setSuccess("Transazione aggiunta con successo!");
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
        <Form.Label>Descrizione</Form.Label>
        <Form.Control
          type="text"
          name="descrizione"
          value={transactionData.descrizione}
          onChange={handleChange}
          required
          placeholder="Es. Caffè, Salario, Affitto"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Importo</Form.Label>
        <Form.Control
          type="number"
          name="importo"
          value={transactionData.importo}
          onChange={handleChange}
          step="0.01"
          required
          placeholder="Es. 10.50"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          name="data"
          value={transactionData.data}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          as="select"
          name="categoriaId"
          value={transactionData.categoriaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleziona una categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tipo Transazione</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={transactionData.type}
          onChange={handleChange}
          required
        >
          <option value="EXPENSE">Spesa</option>
          <option value="INCOME">Entrata</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" variant="success">
        Aggiungi Transazione
      </Button>
    </Form>
  );
}

export default TransactionForm;
