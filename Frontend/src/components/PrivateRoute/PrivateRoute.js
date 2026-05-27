import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente di protezione route.
 * Redirige a /Login se l'utente non è autenticato o non è ADMIN.
 */
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};
