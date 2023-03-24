import "../components/style.css";
import { BsFillPinMapFill } from "react-icons/bs";
import image from "../images/arti1.jpg";

export const Homepage = () => {
  const map = "https://goo.gl/maps/fNGPe8YLToUBTTN8A";
  return (
    <>
      <div className="container text-center">
        <h2 className="p-1">Auto ricambi </h2>
        <div className=" bg-white">
          <h3>
            Esplora il nostro sito e trova ciò che cerchi. E se non lo trovi{" "}
            <a href="contatti">Contattaci</a> o vienici a trovare al:
          </h3>
          <a href={map} target="blank">
            <h3>
              Mappa <BsFillPinMapFill />{" "}
            </h3>
          </a>
          <img
            src={image}
            alt="image"
            style={{ width: "100%", height: "35rem" }}
          />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <table>
            <thead>Orari di apertura </thead>
            <tr>
              <th></th>
              <th>Mattina</th>
              <th>Pomeriggio</th>
            </tr>
            <tr>
              <th>Lunedì</th>
              <td>09:00/13:00</td>
              <td>14:30/18:00</td>
            </tr>
            <tr>
              <th>Martedì</th>
              <td>09:00/13:00</td>
              <td>14:30/18:00</td>
            </tr>
            <tr>
              <th>Mercoledì</th>
              <td>09:00/13:00</td>
              <td>14:30/18:00</td>
            </tr>
            <tr>
              <th>Giovedì</th>
              <td>09:00/13:00</td>
              <td>14:30/18:00</td>
            </tr>
            <tr>
              <th>Venerdì</th>
              <td>09:00/13:00</td>
              <td>14:30/18:00</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};
