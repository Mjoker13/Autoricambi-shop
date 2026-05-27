import { SparePart } from "./SparePart";
import "./style.css";

export const SparePartsList = ({ sparePart, decrementQuantity }) => {
  if (!sparePart || sparePart.length === 0) {
    return (
      <div className="ar-empty-state">
        <p>Nessun ricambio trovato. Usa la barra di ricerca per trovare il pezzo che ti serve.</p>
      </div>
    );
  }

  return (
    <div className="ar-parts-grid">
      {sparePart.map((element) => (
        <SparePart
          key={element.id}
          sparePart={element}
          decrementQuantity={decrementQuantity}
        />
      ))}
    </div>
  );
};
