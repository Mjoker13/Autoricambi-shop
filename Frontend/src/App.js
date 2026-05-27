import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Admin } from "./pages/Admin";
import { SparePartsPage } from "./pages/SparePartsPage";
import { ModelPage } from "./pages/ModelPage";
import { BrandsPage } from "./pages/BrandsPage";
import { BrandAdminPage } from "./pages/BrandAdminPage";
import { ModelAdminPage } from "./pages/ModelAdminPage";
import { SpareAdminPage } from "./pages/SpareAdminPage";
import { PaymentPage } from "./pages/PaymentPage";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { SearchBar } from "./components/SearchBar";
import { searchSparePart, searchMarca, searchModel, purchaseRicambio } from "./Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTelephone,
  BsGearWideConnected,
} from "react-icons/bs";
import "./components/style.css";

// Intervallo refresh quantità disponibili: 30 secondi
const STOCK_REFRESH_MS = 30_000;

export const App = () => {
  const [sparePart, setSparePart]   = useState([]);
  const [model, setModel]           = useState([]);
  const [brand, setBrand]           = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [stockError, setStockError] = useState(""); // messaggio errore acquisto

  /* ── Fetch helpers ── */
  const getBrand      = async (key) => { const r = await searchMarca(key);    setBrand(r); };
  const getModel      = async (key) => { const r = await searchModel(key);    setModel(r); };
  const getSpareParts = async (key) => { const r = await searchSparePart(key); setSparePart(r); };

  /* ── Cart logic ── */
  const handleAddClick = (product) => {
    setCartProducts((prev) => {
      const existing = prev.find((el) => el.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((el) =>
          el.id === product.id ? { ...el, quantity: el.quantity + 1 } : el
        );
      } else {
        newCart = [
          ...prev,
          { id: product.id, name: product.name, quantity: 1, price: product.price },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("storage"));
      return newCart;
    });
  };

  const handleDeleteClick = (product) => {
    setCartProducts((prev) => {
      const newCart = prev
        .map((el) => el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el)
        .filter((el) => el.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("storage"));
      return newCart;
    });
  };

  /**
   * decrementQuantity — aggiungi al carrello.
   *
   * Chiama il backend con acquisto atomico (purchaseRicambio).
   * Il backend usa UPDATE WHERE quantity > 0: nessun overselling anche con
   * N utenti simultanei sullo stesso ricambio.
   *
   * Se il backend risponde 409 (esaurito da un altro utente mentre stava
   * guardando la pagina), mostra un messaggio e aggiorna la quantità locale.
   */
  const decrementQuantity = async (product) => {
    setStockError("");
    const result = await purchaseRicambio(product.id);

    if (result.ok) {
      // Il backend conferma: aggiorna la quantità con il valore reale dal server
      setSparePart((prev) =>
        prev.map((el) =>
          el.id === product.id ? { ...el, quantity: result.data.quantity } : el
        )
      );
      handleAddClick(product);
    } else if (result.status === 409) {
      // Race condition: esaurito mentre guardava la pagina
      setSparePart((prev) =>
        prev.map((el) =>
          el.id === product.id ? { ...el, quantity: 0 } : el
        )
      );
      setStockError(`"${product.name}" è appena esaurito. La pagina è stata aggiornata.`);
      // Auto-hide dopo 5 secondi
      setTimeout(() => setStockError(""), 5000);
    } else {
      // Errore generico → aggiungi comunque (ottimistico, come prima)
      setSparePart((prev) =>
        prev.map((el) =>
          el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
      handleAddClick(product);
    }
  };

  /* Bottone − nel carrello: rimette in magazzino, toglie dal carrello */
  const incrementQuantity = (product) => {
    setSparePart((prev) =>
      prev.map((el) =>
        el.id === product.id ? { ...el, quantity: el.quantity + 1 } : el
      )
    );
    handleDeleteClick(product);
  };

  /* Bottone + nel carrello: toglie dal magazzino, aggiunge al carrello */
  const incrementQuantityCart = (product) => {
    const target = sparePart.find((el) => el.id === product.id);
    if (target && target.quantity > 0) {
      setSparePart((prev) =>
        prev.map((el) =>
          el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
      handleAddClick(product);
    }
  };

  const empityCart = () => {
    localStorage.setItem("empityCart", JSON.stringify([]));
    window.dispatchEvent(new Event("change"));
  };

  /* ── Effects ── */
  useEffect(() => {
    const syncCart = () => {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartProducts(saved);
    };
    const clearCart = () => {
      const empty = JSON.parse(localStorage.getItem("empityCart") || "[]");
      setCartProducts(empty);
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener("change", clearCart);
    syncCart();

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("change", clearCart);
    };
  }, []);

  useEffect(() => {
    getSpareParts();
    getModel();
    getBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh periodico delle quantità disponibili (ogni 30s).
  // Mantiene i badge "Disponibile / Ultimi N / Esaurito" aggiornati in tempo reale
  // anche se altri utenti stanno acquistando contemporaneamente.
  useEffect(() => {
    const interval = setInterval(() => {
      getSpareParts();
    }, STOCK_REFRESH_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthProvider>
      {/* ── Navbar sticky ── */}
      <SearchBar
        empityCart={empityCart}
        changeSpareParts={(k) => getSpareParts(k)}
        changeModel={(k) => getModel(k)}
        changeBrand={(k) => getBrand(k)}
        cartProducts={cartProducts}
        incrementQuantityCart={incrementQuantityCart}
        incrementQuantity={incrementQuantity}
      />

      {/* ── Main content ── */}
      <main>
        <Routes>
          <Route path=""           element={<Homepage />} />
          <Route path="/Brand"     element={<BrandsPage brand={brand} />} />
          <Route path="/Model"     element={<ModelPage model={model} />} />
          <Route
            path="/SpareParts"
            element={
              <SparePartsPage
                sparePart={sparePart}
                decrementQuantity={decrementQuantity}
                stockError={stockError}
              />
            }
          />
          <Route
            path="/admin"
            element={<PrivateRoute><Admin /></PrivateRoute>}
          />
          <Route
            path="/BrandAdminPage"
            element={<PrivateRoute><BrandAdminPage brand={brand} /></PrivateRoute>}
          />
          <Route
            path="/ModelAdminPage"
            element={<PrivateRoute><ModelAdminPage model={model} /></PrivateRoute>}
          />
          <Route
            path="/SparePartsAdminPage"
            element={<PrivateRoute><SpareAdminPage sparePart={sparePart} /></PrivateRoute>}
          />
          <Route
            path="/PaymentPage"
            element={<PaymentPage empityCart={empityCart} />}
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      <footer className="ar-footer">
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            {/* Brand */}
            <div className="col-12 col-md-4">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '0.4rem',
                }}
              >
                <BsGearWideConnected style={{ color: 'var(--color-accent)', fontSize: '1.6rem' }} />
                AutoRicambi
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,.45)', margin: 0 }}>
                Il tuo partner affidabile per ricambi auto originali e compatibili.
              </p>
            </div>

            {/* Contatti */}
            <div className="col-12 col-md-4">
              <ul className="ar-footer-contacts">
                <li>
                  <BsTelephone style={{ color: 'var(--color-accent)' }} />
                  <span>473 833 8484</span>
                </li>
                <li>
                  <BsTelephone style={{ color: 'var(--color-accent)' }} />
                  <span>627 238 3933</span>
                </li>
                <li>
                  <BsFacebook style={{ color: 'var(--color-accent)' }} />
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Auto_Ricambi
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="col-12 col-md-4 text-md-end">
              <div className="d-flex flex-wrap justify-content-md-end gap-3 mb-2">
                <Link to="/" className="ar-footer-link">Home</Link>
                <Link to="/Brand" className="ar-footer-link">Marche</Link>
                <Link to="/Model" className="ar-footer-link">Modelli</Link>
                <Link to="/SpareParts" className="ar-footer-link">Ricambi</Link>
              </div>
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,.1)', margin: '1.5rem 0 1rem' }} />

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="ar-footer-copy">
              &copy; {new Date().getFullYear()} AutoRicambi. Tutti i diritti riservati.
            </p>
            <Link to="/" className="ar-footer-link">
              ↑ Torna in cima
            </Link>
          </div>
        </div>
      </footer>
    </AuthProvider>
  );
};
