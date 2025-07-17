import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function CategoryForm({ onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getToken = () => localStorage.getItem("token");

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

      const categoryData = {
        name: categoryName,
        color: categoryColor,
      };

      const response = await axios.post(
        "http://localhost:8080/api/categorie",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryName("");
      setCategoryColor("");
      if (onCategoryAdded) {
        onCategoryAdded();
      }
    } catch (err) {
      console.error(
        "Errore nell'aggiunta della categoria:",
        err.response ? err.response.data : err.message
      );
      setError("Errore nell'aggiunta della categoria. Riprova.");
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="p-3">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nome Categoria</Form.Label>
        <Form.Control
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          placeholder="Es. Spesa, Lavoro, Svago"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Colore (Hex)</Form.Label>
        <Form.Control
          type="color"
          value={categoryColor}
          onChange={(e) => setCategoryColor(e.target.value)}
          placeholder="#RRGGBB"
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Aggiungi Categoria
      </Button>
    </Form>
  );
}

export default CategoryForm;
