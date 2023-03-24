import "./style.css";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Brand = ({ brand }) => {
  const data = brand.modelli;

  const nav = useNavigate();

  return (
    <>
      <Card
        style={{ width: "15rem", height: "25rem" }}
        className="mb-2 shadow-lg"
      >
        <Card.Img
          className="img-fluid img-thumbnail "
          variant="top"
          src={brand.image}
          style={{ height: "14rem" }}
        />
        <hr />
        <Card.Body className=" align-text-bottom">
          <Card.Title>{brand.name}</Card.Title>
          <Card.Text>Since {brand.yearOfFondation}</Card.Text>
          <DropdownButton
            variant="secondary"
            menuVariant="dark"
            drop="down"
            title="Models available"
            className="mt-2"
          >
            <Card.Text className="model col-lg-12">
              {data.map((el) => {
                return (
                  <Dropdown.Item
                    onClick={() => {
                      nav("/Model");
                    }}
                    key={el.id}
                    className="text-white"
                  >
                    {el.name} -{el.yearOfProduction}
                  </Dropdown.Item>
                );
              })}
            </Card.Text>
          </DropdownButton>
        </Card.Body>
      </Card>
    </>
  );
};
