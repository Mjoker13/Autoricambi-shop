import { Link } from "react-router-dom";
import "../components/style.css";
export const Admin = () => {
  return (
    <>
      <div className="container text-center ">
        <h2 className="p-1 mb-3">Admin</h2>
      </div>

      <div className=" bg-black text-center mb-3 ">
        <Link className="text-white " to="/BrandAdminPage">
          <h3>Edit Brand</h3>
        </Link>
      </div>
      <div className=" bg-black text-center mb-3 ">
        <Link className="text-white " to="/ModelAdminPage">
          <h3>Edit Model</h3>
        </Link>
      </div>
      <div className=" bg-black text-center mb-5 ">
        <Link className="text-white " to="/SparePartsAdminPage">
          <h3>Edit Spare Parts</h3>
        </Link>
      </div>
    </>
  );
};
