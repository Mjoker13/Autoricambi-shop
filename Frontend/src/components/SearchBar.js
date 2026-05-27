import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsGearWideConnected, BsSearch } from "react-icons/bs";
import { Cart } from "./Cart";
import "./style.css";

export const SearchBar = ({
  changeBrand,
  changeModel,
  changeSpareParts,
  cartProducts = [],
  incrementQuantity,
  incrementQuantityCart,
  disabled,
}) => {
  const handleSearch = (event) => {
    const value = event.target.value;
    changeBrand(value);
    changeModel(value);
    changeSpareParts(value);
  };

  const handleSearchBtn = () => {
    // il cambio è già gestito onChange
  };

  return (
    <Navbar className="ar-navbar" expand="lg" variant="dark">
      <Container fluid>
        {/* Brand / Logo */}
        <Navbar.Brand href="/">
          <BsGearWideConnected />
          AutoRicambi
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarMain" />

        <Navbar.Collapse id="navbarMain">
          {/* Nav Links */}
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/Brand">Marche</Nav.Link>
            <Nav.Link href="/Model">Modelli</Nav.Link>
            <Nav.Link href="/SpareParts">Ricambi</Nav.Link>
            <Nav.Link href="/Login">Area Admin</Nav.Link>
          </Nav>

          {/* Carrello */}
          <Cart
            cartProducts={cartProducts}
            incrementQuantity={incrementQuantity}
            incrementQuantityCart={incrementQuantityCart}
            disabled={disabled}
          />

          {/* Barra di ricerca */}
          <Form className="d-flex ms-2 gap-1" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Cerca marca, modello, ricambio..."
              className="ar-search-input"
              aria-label="Ricerca"
              onChange={handleSearch}
            />
            <button
              type="button"
              className="ar-search-btn btn d-flex align-items-center gap-1"
              onClick={handleSearchBtn}
            >
              <BsSearch />
              <span className="d-none d-xl-inline">Cerca</span>
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
