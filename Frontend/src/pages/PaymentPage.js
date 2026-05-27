import { useNavigate } from "react-router-dom";

export const PaymentPage = ({ empityCart }) => {
  const navigate = useNavigate();
  return (
    <>
      <h3>Insert your data for payment</h3>
      <form className="bg-white text-center">
        <div className="mb-3">
          <div className="row mt-3">
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="row mt-3">
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Emai Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
                aria-label="Emai Address"
              />
            </div>
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Card Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="0000 0000 0000 0000"
                aria-label="Card Code"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={(event) => {
            event.preventDefault();
            const answer = window.confirm("confirm payment?");
            if (answer) empityCart();
            navigate("/");
          }}
        >
          Pay
        </button>
      </form>
    </>
  );
};
