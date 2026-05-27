import "./style.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Model = ({ model }) => {
  const data = model.ricambi || [];
  const nav = useNavigate();

  return (
    <div className="ar-model-card">
      <div className="ar-model-card-img-wrap">
        <img
          src={model.image}
          alt={model.name}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {model.yearOfProduction && (
          <span className="ar-model-badge">{model.yearOfProduction}</span>
        )}
      </div>

      <div className="ar-model-card-body">
        <h3 className="ar-model-card-title">{model.name}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          Anno di produzione: {model.yearOfProduction || 'N/D'}
        </p>

        <DropdownButton
          variant="secondary"
          menuVariant="dark"
          drop="down"
          title={`${data.length} ricamb${data.length !== 1 ? 'i' : 'io'} disponibil${data.length !== 1 ? 'i' : 'e'}`}
          className="mt-auto"
          bsPrefix="ar-dropdown-btn btn dropdown-toggle"
        >
          {data.length === 0 ? (
            <Dropdown.Item disabled className="ar-dropdown-item">
              Nessun ricambio
            </Dropdown.Item>
          ) : (
            data.map((el) => (
              <Dropdown.Item
                key={el.id}
                className="ar-dropdown-item"
                onClick={() => nav("/SpareParts")}
              >
                {el.name}
                {el.quantity !== undefined && (
                  <span style={{ opacity: 0.6, marginLeft: '0.5rem', fontSize: '0.8em' }}>
                    ({el.quantity} disp.)
                  </span>
                )}
              </Dropdown.Item>
            ))
          )}
        </DropdownButton>
      </div>
    </div>
  );
};
