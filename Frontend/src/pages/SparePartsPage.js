import { SparePartsList } from "../components/SparePartsList";
import "../components/style.css";
import { BsExclamationTriangle } from "react-icons/bs";

export const SparePartsPage = ({ sparePart, decrementQuantity, stockError }) => {
  return (
    <div className="ar-page">
      {/* Page Header */}
      <div className="ar-page-header">
        <div className="container">
          <h1 className="page-title mb-0">
            Catalogo <span style={{ color: 'var(--color-accent)' }}>Ricambi</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>
            {sparePart && sparePart.length > 0
              ? `${sparePart.length} ricamb${sparePart.length !== 1 ? 'i' : 'io'} disponibil${sparePart.length !== 1 ? 'i' : 'e'} — aggiornato in tempo reale`
              : 'Cerca un ricambio usando la barra di ricerca'}
          </p>
        </div>
      </div>

      <div className="container">
        {/* Banner esaurimento stock da race condition */}
        {stockError && (
          <div
            role="alert"
            style={{
              background: 'rgba(245,158,11,.1)',
              border: '1px solid rgba(245,158,11,.35)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.9rem',
              color: '#92400E',
              fontWeight: 500,
            }}
          >
            <BsExclamationTriangle style={{ flexShrink: 0, fontSize: '1.1rem' }} />
            {stockError}
          </div>
        )}

        <SparePartsList sparePart={sparePart} decrementQuantity={decrementQuantity} />
      </div>
    </div>
  );
};
