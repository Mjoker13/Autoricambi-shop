import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsGearWideConnected } from "react-icons/bs";
import { Cart } from "./Cart";

export const SearchBar = ({
  changeBrand,
  changeModel,
  changeSpareParts,
  cartProducts = [],
  incrementQuantity,
  incrementQuantityCart,
  disabled,
}) => {
  const HandleForKey = async (event) => {
    event.preventDefault();
    changeBrand(event.target.value);
    changeModel(event.target.value);
    changeSpareParts(event.target.value);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <BsGearWideConnected />
          Ricambi per auto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/Brand">Brand</Nav.Link>
            <Nav.Link href="/Model">Model</Nav.Link>
            <Nav.Link href="/SpareParts">Spare parts</Nav.Link>
            <Nav.Link href="/Login">Admin</Nav.Link>
          </Nav>
          <Cart
            cartProducts={cartProducts}
            incrementQuantity={incrementQuantity}
            incrementQuantityCart={incrementQuantityCart}
            disabled={disabled}
          />

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={HandleForKey}
            />

            <Button variant="outline-dark" onClick={HandleForKey}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
