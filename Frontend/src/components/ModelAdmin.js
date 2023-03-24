import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import "../components/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const ModelAdmin = ({ data, insertModel, delModel, brand }) => {
  const defaultInputState = {
    marca: "",
    name: "",
    image: "",
    yearOfProduction: "",
  };
  const [inputState, setInputState] = useState(defaultInputState);
  const [show, setShow] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // validazioni per i campi della form
  const validate = (inputObject) => {
    const errorObj = {};
    if (inputObject.marca === "") {
      errorObj.marca = "Model's Brand is mandatory";
    }
    if (inputObject.name === "") {
      errorObj.name = "Model's name is mandatory";
    }
    if (inputObject.image === "") {
      errorObj.image = "Model's image is mandatory";
    }
    if (
      inputObject.yearOfProduction < 1894 ||
      inputObject.yearOfProduction > 2023
    ) {
      errorObj.yearOfProduction = "The first Model was born in 1894";
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
      insertModel(inputState, inputState.marca);
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
                {el.name}{" "}
                <div className=" text-end">
                  <Button
                    className="me-3 bg-light text-dark border-dark"
                    onClick={(event) => {
                      event.preventDefault();
                      const answer = window.confirm("Confirm delete?");
                      if (answer) delModel(el.id);
                    }}
                  >
                    <BsTrash />
                  </Button>
                </div>
                <hr />
              </li>
            </ul>
          );
        })}
        <button onClick={handleShow}>Insert a new Model </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter all fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="marca">
                <Form.Label>Model's brand</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    handleInputChange("marca", e.target.value);
                  }}
                  isInvalid={inputErrors.marca ? true : false}
                  autoFocus
                >
                  {brand.map((el) => {
                    return (
                      <option value={el.id} key={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                  <Form.Control.Feedback type="invalid">
                    {inputErrors.marca}
                  </Form.Control.Feedback>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Model's name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alfa, Audi, Ferrari ecc.."
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
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Model's image link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="http//: ..."
                  value={inputState.image}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.image ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="yearOfProduction">
                <Form.Label>Year of Production</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  value={inputState.yearOfProduction}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  isInvalid={inputErrors.yearOfProduction ? true : false}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {inputErrors.yearOfProduction}
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
