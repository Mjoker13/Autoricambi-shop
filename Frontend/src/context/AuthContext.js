import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

// ── Costanti ──────────────────────────────────────────────────────────────────
// Inattività massima: 4 ore (ms). Il token JWT dura 24h — se l'utente è attivo
// rimane loggato per tutto il giorno; se inattivo per 4h viene disconnesso.
const INACTIVITY_TIMEOUT_MS = 4 * 60 * 60 * 1000;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Decodifica il payload di un JWT (senza verifica crittografica — la verifica
 * vera avviene sul backend ad ogni chiamata API protetta).
 */
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    // Sostituisce i caratteri URL-safe di base64 e aggiunge il padding
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded  = base64 + "=".repeat((4 - base64.length % 4) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/**
 * Verifica se un token JWT è scaduto.
 * Ritorna true se scaduto o non decodificabile.
 */
function isTokenExpired(token) {
  if (!token) return true;
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  // exp è in secondi Unix
  return Date.now() / 1000 > payload.exp;
}

/**
 * Verifica se la sessione è scaduta per inattività.
 */
function isSessionInactive() {
  const lastActivity = parseInt(localStorage.getItem("authLastActivity") || "0", 10);
  if (!lastActivity) return false; // prima volta
  return Date.now() - lastActivity > INACTIVITY_TIMEOUT_MS;
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem("authToken");
    // Pulizia preventiva: token scaduto o sessione inattiva → logout immediato
    if (t && (isTokenExpired(t) || isSessionInactive())) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authLastActivity");
      return null;
    }
    return t || null;
  });

  const [user, setUser] = useState(() => {
    if (!localStorage.getItem("authToken")) return null;
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // ── Aggiorna il timestamp di ultima attività ─────────────────────────────
  const touchActivity = useCallback(() => {
    localStorage.setItem("authLastActivity", String(Date.now()));
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback((authData) => {
    const userData = { username: authData.username, role: authData.role };
    setToken(authData.token);
    setUser(userData);
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authLastActivity", String(Date.now()));
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authLastActivity");
  }, []);

  // ── Controllo periodico token + inattività ────────────────────────────────
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token) || isSessionInactive()) {
        logout();
      }
    }, 60_000); // controlla ogni minuto

    return () => clearInterval(interval);
  }, [token, logout]);

  // ── Aggiorna lastActivity su ogni interazione dell'utente ─────────────────
  useEffect(() => {
    if (!token) return;

    const events = ["click", "keydown", "mousemove", "scroll", "touchstart"];
    const handler = () => touchActivity();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, [token, touchActivity]);

  // ── Calcola quando scadrà la sessione ─────────────────────────────────────
  const sessionExpiresAt = token ? (() => {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return null;
    // Tra token exp e inattività, prende il minimo
    const tokenExpMs   = payload.exp * 1000;
    const lastActivity = parseInt(localStorage.getItem("authLastActivity") || "0", 10);
    const inactivityExpMs = lastActivity ? lastActivity + INACTIVITY_TIMEOUT_MS : tokenExpMs;
    return new Date(Math.min(tokenExpMs, inactivityExpMs));
  })() : null;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        touchActivity,
        sessionExpiresAt,
        isAuthenticated: !!token,
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
};
