import { BrandList } from "../components/BrandList";
import "../components/style.css";

export const BrandsPage = ({ brand }) => {
  return (
    <div className="ar-page">
      {/* Page Header */}
      <div className="ar-page-header">
        <div className="container">
          <h1 className="page-title mb-0">
            Tutte le <span style={{ color: 'var(--color-accent)' }}>Marche</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>
            Seleziona una marca per vedere i modelli disponibili
          </p>
        </div>
      </div>

      <div className="container">
        <BrandList brand={brand} />
      </div>
    </div>
  );
};
