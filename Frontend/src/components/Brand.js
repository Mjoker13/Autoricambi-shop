import "./style.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Brand = ({ brand }) => {
  const data = brand.modelli || [];
  const nav = useNavigate();

  return (
    <div className="ar-brand-card">
      <div className="ar-brand-card-img-wrap">
        <img
          src={brand.image}
          alt={`${brand.name} logo`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = 'var(--color-surface-2)';
          }}
        />
      </div>

      <div className="ar-brand-card-body">
        <h3 className="ar-brand-card-title">{brand.name}</h3>
        <p className="ar-brand-card-sub">
          {brand.yearOfFondation ? `Dal ${brand.yearOfFondation}` : 'Casa automobilistica'}
        </p>

        <DropdownButton
          variant="secondary"
          menuVariant="dark"
          drop="down"
          title={`${data.length} model${data.length !== 1 ? 'li' : 'lo'} disponibil${data.length !== 1 ? 'i' : 'e'}`}
          className="mt-auto"
          bsPrefix="ar-dropdown-btn btn dropdown-toggle"
        >
          {data.length === 0 ? (
            <Dropdown.Item disabled className="ar-dropdown-item">
              Nessun modello
            </Dropdown.Item>
          ) : (
            data.map((el) => (
              <Dropdown.Item
                key={el.id}
                className="ar-dropdown-item"
                onClick={() => nav("/Model")}
              >
                {el.name}
                {el.yearOfProduction && (
                  <span style={{ opacity: 0.6, marginLeft: '0.5rem', fontSize: '0.8em' }}>
                    {el.yearOfProduction}
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
