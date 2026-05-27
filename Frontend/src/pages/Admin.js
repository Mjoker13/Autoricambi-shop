import { Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { useAuth } from "../context/AuthContext";
import {
  BsTagsFill,
  BsCarFront,
  BsTools,
} from "react-icons/bs";
import "../components/style.css";

const NAV_CARDS = [
  {
    to:    "/BrandAdminPage",
    icon:  <BsTagsFill />,
    title: "Marche",
    desc:  "Aggiungi, modifica o elimina le marche auto nel catalogo",
  },
  {
    to:    "/ModelAdminPage",
    icon:  <BsCarFront />,
    title: "Modelli",
    desc:  "Gestisci i modelli per ogni marca con anno di produzione",
  },
  {
    to:    "/SparePartsAdminPage",
    icon:  <BsTools />,
    title: "Ricambi",
    desc:  "Gestisci il catalogo ricambi: prezzi, quantità, riferimenti",
  },
];

export const Admin = () => {
  const { user } = useAuth();

  return (
    <AdminLayout
      title={`Ciao, ${user?.username || 'Admin'} 👋`}
      subtitle="Pannello di controllo — gestisci il catalogo dal menu qui sotto"
    >
      {/* ── Cards di navigazione ── */}
      <div className="row g-4 mb-4">
        {NAV_CARDS.map((card) => (
          <div key={card.to} className="col-12 col-md-4">
            <Link to={card.to} className="ar-admin-nav-card">
              <div className="ar-admin-nav-card-icon">{card.icon}</div>
              <div>
                <h3 className="ar-admin-nav-card-title">{card.title}</h3>
                <p className="ar-admin-nav-card-desc">{card.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ── Info box ── */}
      <div
        style={{
          background: 'rgba(249,115,22,.07)',
          border: '1px solid rgba(249,115,22,.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <strong style={{ color: 'var(--color-accent)' }}>Suggerimento:</strong>
        {" "}Usa la barra di ricerca nella navbar per trovare rapidamente elementi specifici nel catalogo.
        Le modifiche sono immediatamente visibili sul sito pubblico.
      </div>
    </AdminLayout>
  );
};
