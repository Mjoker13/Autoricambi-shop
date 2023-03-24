import { useState } from "react";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import "../components/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const SparePartAdmin = ({
  insertSparePart,
  delSparePart,
  model,
  data,
  updateSparePart,
}) => {
  const defaultInputState = {
    name: "",
    quantity: "",
    category: "",
    reference: "",
    price: "",
    modelli: "",
  };

  const [inputState, setInputState] = useState(defaultInputState);
  const [show, setShow] = useState(false);
  const [showPut, setShowPut] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosePut = () => setShowPut(false);
  const handleShowPut = () => setShowPut(true);

  // validazioni per i campi della form
  const validate = (inputObject) => {
    const errorObj = {};
    if (inputObject.name === "") {
      errorObj.name = "Edit spare Part's name";
    }
    if (inputObject.category === "") {
      errorObj.category = "Edit spare Part's category";
    }
    if (inputObject.reference === "") {
      errorObj.reference = "Edit spare Part's reference";
    }
    if (inputObject.quantity === 0) {
      errorObj.quantity = "Edit quantity";
    }
    if (inputObject.price === "") {
      errorObj.price = "Edit price";
    }

    return errorObj;
  };
  // acquisizione valori form
  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errorObject = validate(inputState);
    if (Object.keys(errorObject).length === 0) {
      insertSparePart(inputState, inputState.modelli);
      setInputState(defaultInputState);
    } else {
      setInputErrors(errorObject);
    }
  };
  const handleUpdate = () => {
    handleShowPut();
    const errorObject = validate(inputState);
    if (Object.keys(errorObject).length === 0) {
      updateSparePart(inputState, localStorage.getItem("Id"));
      setInputState(defaultInputState);
    } else {
      setInputErrors(errorObject);
    }
  };

  return (
    <>
      <h2 className="text-center m-2">Edit your Model</h2>
      <div className="container mt-3 fw-bold" id="admin">
        {data.map((el) => {
          return (
            <ul key={el.id} className="list-unstyled  text-black">
              <li>
                {el.name} - {el.reference}
                <div className=" text-end">
                  <Button
                    className="me-3 bg-light text-dark border-dark"
                    onClick={(event) => {
                      event.preventDefault();
                      const answer = window.confirm("Confirm delete?");
                      if (answer) delSparePart(el.id);
                    }}
                  >
                    <BsTrash />
                  </Button>
                  <Button
                    className="me-3 bg-light text-dark border-dark"
                    onClick={(e) => {
                      localStorage.setItem("Id", el.id);
                      e.preventDefault();
                      setInputState({
                        name: el.name,
                        category: el.category,
                        price: el.price,
                        quantity: el.quantity,
                        reference: el.reference,
                      });
                      handleUpdate(el.id);
                    }}
                  >
                    <BsFillPencilFill />
                  </Button>
                </div>
                <hr />
              </li>
            </ul>
          );
        })}
        <Modal show={showPut} onHide={handleClosePut}>
          <Modal.Header closeButton>
            <Modal.Title>Enter all fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Spare Part's name</Form.Label>
                <Form.Control
                  type="text"
                  value={inputState.name}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.name ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Spare Part's category</Form.Label>
                <Form.Control
                  type="text"
                  value={inputState.category}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.category ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="reference">
                <Form.Label>Spare Part's reference</Form.Label>
                <Form.Control
                  type="text"
                  value={inputState.reference}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.reference ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.reference}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={inputState.quantity}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.quantity ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={inputState.price}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.price ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <button onClick={handleShow}>Insert a new Spare Part </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter all fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="modelli">
                <Form.Label> Model available</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleInputChange("modelli", e.target.value);
                  }}
                  isInvalid={inputErrors.modelli ? true : false}
                  autoFocus
                >
                  {model.map((el) => {
                    return (
                      <option value={el.id} key={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                  <Form.Control.Feedback type="invalid">
                    {inputErrors.modelli}
                  </Form.Control.Feedback>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Spare Part's name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sportello dx, Cofano, Motore ..."
                  value={inputState.name}
                  onChange={(e) => {
                    handleInputChange("name", e.target.value);
                  }}
                  isInvalid={inputErrors.name ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Spare Part's category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cazzorreria, Meccanica ..."
                  value={inputState.category}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.category ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="reference">
                <Form.Label>Spare Part's reference</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stelvio 2010, A4 2020..."
                  value={inputState.reference}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.reference ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.reference}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  value={inputState.quantity}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.quantity ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.quantity}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price in €"
                  value={inputState.price}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.price ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
