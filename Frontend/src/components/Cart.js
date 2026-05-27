import { BsCartCheck, BsHandbag } from "react-icons/bs";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";
import { Link } from "react-router-dom";

export const Cart = ({
  cartProducts = [],
  incrementQuantity,
  incrementQuantityCart,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalItems = cartProducts.reduce((sum, el) => sum + el.quantity, 0);

  function calculateTotal() {
    return cartProducts
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }

  return (
    <>
      {/* Bottone carrello nella navbar */}
      <button className="ar-cart-btn btn mx-2" onClick={handleShow}>
        <BsCartCheck />
        <span>Carrello</span>
        {totalItems > 0 && (
          <span className="ar-cart-badge badge">{totalItems}</span>
        )}
      </button>

      {/* Offcanvas */}
      <Offcanvas
        className="ar-offcanvas"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Il tuo carrello
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {cartProducts.length === 0 ? (
            <div className="ar-empty-state">
              <BsCartCheck />
              <p>Il carrello è vuoto</p>
            </div>
          ) : (
            <ul className="list-unstyled mb-0">
              {cartProducts.map((el) => (
                <li key={el.id} className="cart-item">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <span className="cart-item-name">{el.name}</span>
                    <span className="cart-item-price">&euro;{(el.price * el.quantity).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      &euro;{Number(el.price).toFixed(2)} cad.
                    </span>
                    <div className="d-flex align-items-center gap-1">
                      <button
                        className="cart-qty-btn btn"
                        onClick={() => incrementQuantity(el)}
                        aria-label="Rimuovi uno"
                      >
                        −
                      </button>
                      <span className="cart-qty-value">{el.quantity}</span>
                      <button
                        className="cart-qty-btn btn"
                        onClick={() => incrementQuantityCart(el)}
                        aria-label="Aggiungi uno"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Offcanvas.Body>

        {/* Footer fisso con totale e checkout */}
        <div className="cart-footer">
          <div className="d-flex justify-content-between align-items-baseline mb-3">
            <span className="cart-total-label">Totale</span>
            <span className="cart-total-value">&euro;{calculateTotal()}</span>
          </div>
          <Link className="btn-checkout" to="/PaymentPage" onClick={handleClose}>
            <BsHandbag />
            Procedi al pagamento
          </Link>
        </div>
      </Offcanvas>
    </>
  );
};
