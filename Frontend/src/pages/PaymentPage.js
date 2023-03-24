import { useNavigate } from "react-router-dom";

export const PaymentPage = ({ empityCart }) => {
  const navigate = useNavigate();
  return (
    <>
      <h3>Insert your data for payment</h3>
      <form className="bg-white text-center">
        <div class="mb-3">
          <div class="row mt-3">
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
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
        <div class="mb-3">
          <div class="row mt-3">
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Emai Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
                aria-label="Emai Address"
              />
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
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
