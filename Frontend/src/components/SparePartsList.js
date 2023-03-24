import { SparePart } from "./SparePart";

export const SparePartsList = ({ sparePart, decrementQuantity }) => {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          {sparePart.map((element) => {
            return (
              <div
                key={element.id}
                className="col-12 col-md-6 col-lg-4 d-flex justify-content-around"
              >
                <SparePart
                  sparePart={element}
                  decrementQuantity={decrementQuantity}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
