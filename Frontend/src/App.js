import { Routes, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Admin } from "./pages/Admin";
import { Container } from "react-bootstrap";
import { SparePartsPage } from "./pages/SparePartsPage";
import { ModelPage } from "./pages/ModelPage";
import { BrandsPage } from "./pages/BrandsPage";
import { BrandAdminPage } from "./pages/BrandAdminPage";
import { ModelAdminPage } from "./pages/ModelAdminPage";
import { SpareAdminPage } from "./pages/SpareAdminPage";
import "../src/components/style.css";
import { PaymentPage } from "./pages/PaymentPage";
import { searchSparePart, searchMarca, searchModel } from "./Api";
import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { BsFacebook } from "react-icons/bs";
import { Login } from "./pages/Login";

export const App = () => {
  const [sparePart, setSparePart] = useState([]);
  const [model, setModel] = useState([]);
  const [brand, setBrand] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const getBrand = async (key) => {
    const response = await searchMarca(key);
    setBrand(response);
  };

  const changeBrand = async (key) => {
    getBrand(key);
  };

  const getModel = async (key) => {
    const response = await searchModel(key);
    setModel(response);
  };

  const changeModel = async (key) => {
    getModel(key);
  };

  const getSpareParts = async (key) => {
    const response = await searchSparePart(key);
    setSparePart(response);
  };

  const changeSpareParts = async (key) => {
    getSpareParts(key);
  };

  // funzione per decrementare la quantità del ricambio e aumentare la quantita del ricambio
  const decrementQuantity = (product) => {
    sparePart.filter((el) => {
      if (el.id === product.id) {
        el.quantity--;
        if (el.id === 0) {
          return false;
        }
      }
      return true;
    });
    handleAddClick(product);
  };

  // funzione per decrementare il carrello dal bottone del carrello(-) e incrementare la quantita del ricambio
  const incrementQuantity = (product) => {
    sparePart.filter((el) => {
      if (el.id === product.id) {
        el.quantity++;
        if (el.id === 0) {
          return false;
        }
      }
      return true;
    });
    handleDeleteClick(product);
  };

  // funzione per incrementare il carrello dal bottore del carrello(+) e diminuire la quantita del ricambio
  const incrementQuantityCart = (product) => {
    sparePart.filter((el) => {
      if ((el.id === product.id) & (el.quantity > 0)) {
        el.quantity--;
        handleAddClick(product);
        return true;
      } else {
        return false;
      }
    });
  };

  const handleDeleteClick = (product) => {
    const newCart = cartProducts.filter((el) => {
      if (el.id === product.id) {
        el.quantity--;
        if (el.quantity === 0) {
          return false;
        }
      }
      return true;
    });
    setCartProducts(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  // create new product
  const handleAddClick = (product) => {
    let found = false;
    let newCart = cartProducts.filter((el) => {
      return true;
    });
    newCart.forEach((el) => {
      if (el.id === product.id) {
        el.quantity++;
        found = true;
      }
    });
    if (!found) {
      const newProduct = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        index: cartProducts.length,
      };
      const newCart2 = [...newCart, newProduct];
      setCartProducts(newCart2);
      localStorage.setItem("cart", JSON.stringify(newCart2));
      window.dispatchEvent(new Event("storage"));
    } else {
      setCartProducts(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const empityCart = () => {
    localStorage.setItem("empityCart", JSON.stringify([]));
    window.dispatchEvent(new Event("change"));
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const carts = JSON.parse(localStorage.getItem("cart") || []);
      setCartProducts(carts);
    });
    const carts = JSON.parse(localStorage.getItem("cart"));
    setCartProducts(carts);

    window.addEventListener("change", () => {
      const empityCart = JSON.parse(localStorage.getItem("empityCart") || []);
      setCartProducts(empityCart);
    });
  }, []);

  useEffect(() => {
    getSpareParts();
    getModel();
    getBrand();
  }, []);

  return (
    <>
      <Container>
        <SearchBar
          empityCart={empityCart}
          changeSpareParts={changeSpareParts}
          changeModel={changeModel}
          changeBrand={changeBrand}
          cartProducts={cartProducts}
          incrementQuantityCart={incrementQuantityCart}
          incrementQuantity={incrementQuantity}
        />
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/Brand" element={<BrandsPage brand={brand} />} />
          <Route path="/Model" element={<ModelPage model={model} />} />
          <Route
            path="/SpareParts"
            element={
              <SparePartsPage
                sparePart={sparePart}
                decrementQuantity={decrementQuantity}
              />
            }
          />
        </Routes>
      </Container>
      <Container>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/BrandAdminPage"
            element={<BrandAdminPage brand={brand} />}
          />
          <Route
            path="/ModelAdminPage"
            element={<ModelAdminPage model={model} />}
          />
          <Route
            path="/SparePartsAdminPage"
            element={<SpareAdminPage sparePart={sparePart} />}
          />
          <Route
            path="/PaymentPage"
            element={<PaymentPage empityCart={empityCart} />}
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Container>
      <Container className="footer mt-2 bg-black text-white text-center">
        <ul
          className=" list-unstyled fw-bold d-flex justify-content-around"
          id="contatti"
        >
          Contatti:
          <li> TEL 4738338484</li>
          <li> Cell 6272383933</li>
          <li>
            <BsFacebook /> Auto_Ricambi
          </li>
        </ul>
        <Link className="text-white" to="">
          <h5>Back to home</h5>
        </Link>
      </Container>
    </>
  );
};
