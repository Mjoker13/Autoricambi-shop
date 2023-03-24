import { BrandList } from "../components/BrandList";
import "../components/style.css";

export const BrandsPage = ({ brand }) => {
  return (
    <>
      <div className="container text-center">
        <h2 className="p-1">Brand</h2>

        <BrandList brand={brand} />
      </div>
    </>
  );
};
