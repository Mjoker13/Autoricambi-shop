import { ModelList } from "../components/ModelList";
import "../components/style.css";

export const ModelPage = ({ model }) => {
  return (
    <div className="ar-page">
      {/* Page Header */}
      <div className="ar-page-header">
        <div className="container">
          <h1 className="page-title mb-0">
            Tutti i <span style={{ color: 'var(--color-accent)' }}>Modelli</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>
            Seleziona un modello per vedere i ricambi disponibili
          </p>
        </div>
      </div>

      <div className="container">
        <ModelList model={model} />
      </div>
    </div>
  );
};
