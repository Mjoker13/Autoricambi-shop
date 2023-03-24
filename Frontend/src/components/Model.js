import "./style.css";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Model = ({ model }) => {
  const data = model.ricambi;
  const nav = useNavigate();
  return (
    <>
      <Card
        style={{ width: "18rem", height: "25rem" }}
        className="mb-2 shadow-lg"
      >
        <Card.Img
          className="img-fluid img-thumbnail "
          variant="top"
          src={model.image}
          style={{ height: "14rem" }}
        />
        <Card.Body>
          <Card.Title>{model.name}</Card.Title>
          <Card.Text>Year Of Production {model.yearOfProduction}</Card.Text>
          <DropdownButton
            variant="secondary"
            menuVariant="dark"
            drop="down"
            title="Spare Parts "
            className="mt-2"
          >
            {data.map((el) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    nav("/SpareParts");
                  }}
                  key={el.id}
                  className="  text-white"
                >
                  {el.name} , {el.quantity}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Card.Body>
      </Card>
    </>
  );
};
