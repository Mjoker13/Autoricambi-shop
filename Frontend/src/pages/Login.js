import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../components/style.css";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <Form className=" bg-light text-black">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      <Button
        variant="primary"
        type="submit"
        className=" btn border-dark"
        onClick={(event) => {
          event.preventDefault();
          const answer = window.confirm("Confirm Login?");
          if (answer) navigate("/Admin");
        }}
      >
        Submit
      </Button>
    </Form>
  );
};
