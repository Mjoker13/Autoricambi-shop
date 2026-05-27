import { Model } from "./Model";
import "./style.css";

export const ModelList = ({ model }) => {
  if (!model || model.length === 0) {
    return (
      <div className="ar-empty-state">
        <p>Nessun modello trovato. Prova con un altro termine di ricerca.</p>
      </div>
    );
  }

  return (
    <div className="ar-cards-grid">
      {model.map((element) => (
        <Model key={element.id} model={element} />
      ))}
    </div>
  );
};
