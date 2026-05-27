import "./style.css";
import { BsCartPlus } from "react-icons/bs";

const getStockBadge = (qty) => {
  if (qty > 5)  return <span className="ar-badge-available">Disponibile</span>;
  if (qty > 0)  return <span className="ar-badge-low-stock">Ultimi {qty}</span>;
  return        <span className="ar-badge-out-of-stock">Esaurito</span>;
};

export const SparePart = ({ sparePart, decrementQuantity }) => {
  const isOutOfStock = sparePart.quantity === 0;

  return (
    <div className="ar-part-card">
      {/* Header: nome + badge stock */}
      <div className="ar-part-header">
        <h4 className="ar-part-name">{sparePart.name}</h4>
        {getStockBadge(sparePart.quantity)}
      </div>

      {/* Meta info */}
      <div className="ar-part-meta">
        {sparePart.category && (
          <span>
            <strong>Categoria:</strong> {sparePart.category}
          </span>
        )}
        {sparePart.color && (
          <span>
            <strong>Colore:</strong> {sparePart.color}
          </span>
        )}
        {sparePart.reference && (
          <span>
            <strong>Rif.:</strong> {sparePart.reference}
          </span>
        )}
      </div>

      {/* Footer: prezzo + CTA */}
      <div className="ar-part-footer">
        <div className="ar-part-price">
          {Number(sparePart.price).toFixed(2)}
          <span>&nbsp;&euro;</span>
        </div>
        <button
          className="ar-add-cart-btn btn"
          disabled={isOutOfStock}
          onClick={() => decrementQuantity(sparePart)}
          title={isOutOfStock ? 'Non disponibile' : 'Aggiungi al carrello'}
        >
          <BsCartPlus />
          {isOutOfStock ? 'Esaurito' : 'Aggiungi'}
        </button>
      </div>
    </div>
  );
};
