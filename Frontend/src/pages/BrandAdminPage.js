import { PostBrand, PutBrand, DeleteBrand } from "../Api";
import { useState, useEffect } from "react";
import "../components/style.css";
import { searchMarca } from "../Api";
import { BrandAdmin } from "../components/BrandAdmin";

export const BrandAdminPage = () => {
  const [data, setData] = useState([]);

  // get all brand
  const getBrand = async (key) => {
    const response = await searchMarca(key);
    setData(response);
  };

  // const changeBrand = async (key) => {
  //   getBrand(key);
  // };

  const insertBrand = async (temp) => {
    await PostBrand(temp);
    getBrand();
  };

  const delBrand = async (id) => {
    await DeleteBrand(id);
    getBrand();
  };

  const updateBrand = async (temp, id) => {
    await PutBrand(temp, id);
    getBrand();
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <>
      <BrandAdmin
        insertBrand={insertBrand}
        delBrand={delBrand}
        data={data}
        updateBrand={updateBrand}
      />
    </>
  );
};
