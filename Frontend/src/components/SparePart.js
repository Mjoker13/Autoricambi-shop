import "./style.css";
import { Card, Button } from "react-bootstrap";

export const SparePart = ({ sparePart, decrementQuantity }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{sparePart.name}</Card.Title>
          <Card.Text>{sparePart.category}</Card.Text>
          <Card.Text>{sparePart.color}</Card.Text>
          <Card.Text>{sparePart.price.toFixed(2)}</Card.Text>
          <Card.Text>Availability: {sparePart.quantity}</Card.Text>
          <Card.Text className="fw-bold">{sparePart.reference}</Card.Text>
          <Button
            className="bg-secondary bg-opacity-50 border-dark text-dark"
            disabled={sparePart.quantity === 0 ? true : false}
            onClick={() => {
              decrementQuantity(sparePart);
            }}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
