import { Model } from "./Model";
import "../components/style.css";

export const ModelList = ({ model }) => {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          {model.map((element) => {
            return (
              <div
                key={element.id}
                className="col-12 col-md-6 col-lg-4 d-flex justify-content-around"
              >
                <Model model={element} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
