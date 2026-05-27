import { Brand } from "./Brand";
import "./style.css";

export const BrandList = ({ brand }) => {
  if (!brand || brand.length === 0) {
    return (
      <div className="ar-empty-state">
        <p>Nessuna marca trovata. Prova con un altro termine di ricerca.</p>
      </div>
    );
  }

  return (
    <div className="ar-cards-grid">
      {brand.map((element) => (
        <Brand key={element.id} brand={element} />
      ))}
    </div>
  );
};
