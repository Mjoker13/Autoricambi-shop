import { BsCart4, BsCart2, BsFillBagCheckFill } from "react-icons/bs";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";
import { Link } from "react-router-dom";

export const Cart = ({
  cartProducts = [],
  incrementQuantity,
  incrementQuantityCart,
}) => {
  const [showList, setShowList] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowList(!showList);
  };
  const handleShow = () => {
    setShow(true);
    setShowList(!showList);
  };

  function calculateTotal() {
    let total = 0;
    for (let item of cartProducts) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  }

  let content = <></>;
  if (showList) {
    content = (
      <ul>
        {cartProducts.map((el) => {
          return (
            <li key={el.id}>
              <div className="row ">
                <div className="col-6 ">
                  {el.name} {el.id} &euro;{el.price}
                </div>
                <div className="col-6 text-end  ">
                  <button
                    className="btnCart "
                    onClick={() => incrementQuantity(el)}
                  >
                    -
                  </button>
                  {el.quantity}
                  <button
                    className="btnCart"
                    onClick={() => incrementQuantityCart(el)}
                  >
                    +
                  </button>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="alert">
      <button className=" btn mx-1 border-0" onClick={handleShow}>
        <BsCart4 />
        Show your cart
        <span className="badge bg-secondary m-1">{cartProducts.length}</span>
      </button>
      <Offcanvas className="alert fw-bold" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Check your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{content}</Offcanvas.Body>

        <div className="text-end">
          Total <BsCart2 />: {calculateTotal()} &euro;
          <p>
            <Link className="btn" to="/PaymentPage">
              Go to payment <BsFillBagCheckFill />
            </Link>
          </p>
          <hr />
        </div>
      </Offcanvas>
    </div>
  );
};
