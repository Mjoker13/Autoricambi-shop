import { Brand } from "./Brand";

export const BrandList = ({ brand }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {brand.map((element) => {
            return (
              <div
                key={element.id}
                className="col-12 col-md-6 col-lg-4 d-flex justify-content-around"
              >
                <Brand brand={element} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
