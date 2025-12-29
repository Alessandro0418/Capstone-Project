import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function CategoryForm({ onCategoryAdded }) {
  const DEFAULT_COLOR = "#252222";
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState(DEFAULT_COLOR);
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
      setCategoryColor(DEFAULT_COLOR);
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
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          placeholder="Expense, Work, Free Time..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="color"
          value={categoryColor}
          onChange={(e) => setCategoryColor(e.target.value)}
          placeholder="#RRGGBB"
        />
      </Form.Group>

      <Button type="submit" className="btn-custom3">
        Add Category
      </Button>
    </Form>
  );
}

export default CategoryForm;
