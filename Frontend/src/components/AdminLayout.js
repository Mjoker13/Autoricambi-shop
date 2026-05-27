import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BsGearWideConnected,
  BsTagsFill,
  BsCarFront,
  BsTools,
  BsArrowLeft,
  BsBoxArrowRight,
  BsPersonCircle,
} from "react-icons/bs";
import "./style.css";

const NAV_ITEMS = [
  { to: "/admin",               icon: <BsGearWideConnected />, label: "Dashboard",      exact: true  },
  { to: "/BrandAdminPage",      icon: <BsTagsFill />,          label: "Gestione Marche"              },
  { to: "/ModelAdminPage",      icon: <BsCarFront />,          label: "Gestione Modelli"             },
  { to: "/SparePartsAdminPage", icon: <BsTools />,             label: "Gestione Ricambi"             },
];

export const AdminLayout = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate  = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname === item.to;

  return (
    <div className="ar-admin-layout">
      {/* ── Sidebar ── */}
      <aside className="ar-admin-sidebar">
        {/* User info */}
        <div style={{ padding: '1rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,.1)', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(249,115,22,.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-accent)', fontSize: '1.2rem',
            }}>
              <BsPersonCircle />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                {user?.username || 'Admin'}
              </div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '0.75rem' }}>
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="ar-admin-sidebar-title">Menu</div>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`ar-admin-sidebar-link${isActive(item) ? " active" : ""}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <div className="ar-admin-sidebar-divider" />
        <div className="ar-admin-sidebar-title">Navigazione</div>

        <Link to="/" className="ar-admin-sidebar-link">
          <BsArrowLeft />
          Torna al sito
        </Link>

        <div className="ar-admin-sidebar-divider" />

        <button className="ar-admin-sidebar-logout" onClick={handleLogout}>
          <BsBoxArrowRight />
          Logout
        </button>
      </aside>

      {/* ── Main content ── */}
      <main className="ar-admin-main">
        {(title || subtitle) && (
          <div className="ar-admin-header">
            <div>
              {title    && <h1 className="ar-admin-title">{title}</h1>}
              {subtitle && <p className="ar-admin-sub">{subtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};
