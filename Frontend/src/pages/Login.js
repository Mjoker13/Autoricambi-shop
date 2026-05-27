import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../Api";
import { BsGearWideConnected, BsEye, BsEyeSlash } from "react-icons/bs";
import "../components/style.css";

export const Login = () => {
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      if (data?.token) {
        login(data);
        navigate("/admin");
      } else {
        setError("Credenziali non valide. Riprova.");
      }
    } catch {
      setError("Errore durante il login. Controlla le credenziali e riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ar-login-page">
      <div className="ar-login-card">
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
            }}
          >
            <BsGearWideConnected style={{ color: 'var(--color-accent)', fontSize: '2rem' }} />
            AutoRicambi
          </div>
        </div>

        <h1 className="ar-login-title text-center">Area Admin</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.75rem' }}>
          Accedi per gestire il catalogo
        </p>

        {/* Errore */}
        {error && (
          <div
            role="alert"
            style={{
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.3)',
              borderRadius: 'var(--radius-sm)',
              color: '#B91C1C',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="ar-form-label" htmlFor="loginUsername">
              Username
            </label>
            <input
              id="loginUsername"
              type="text"
              className="form-control ar-form-input"
              placeholder="Inserisci username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="ar-form-label" htmlFor="loginPassword">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="loginPassword"
                type={showPwd ? "text" : "password"}
                className="form-control ar-form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: 0,
                  display: 'flex',
                }}
                aria-label={showPwd ? "Nascondi password" : "Mostra password"}
              >
                {showPwd ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn ar-btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Accesso in corso…
              </>
            ) : (
              "Accedi"
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link
            to="/"
            style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            ← Torna al sito
          </Link>
        </p>
      </div>
    </div>
  );
};
