import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../Api";
import "../components/style.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      if (data?.token) {
        login(data);
        navigate("/Admin");
      } else {
        setError("Credenziali non valide");
      }
    } catch (err) {
      setError("Errore durante il login. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form
        className="bg-light text-black p-4 rounded shadow"
        style={{ minWidth: "320px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-3 text-center">Area Admin</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? "Accesso in corso..." : "Accedi"}
        </Button>
      </Form>
    </div>
  );
};
