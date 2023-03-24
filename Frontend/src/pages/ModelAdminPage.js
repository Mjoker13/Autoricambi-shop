import { useState, useEffect } from "react";
import { searchModel, PostModel, DeleteModel, searchMarca } from "../Api";
import { ModelAdmin } from "../components/ModelAdmin";

export const ModelAdminPage = () => {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);

  const getBrand = async (key) => {
    const response = await searchMarca(key);
    setBrand(response);
  };

  const getModel = async (key) => {
    const response = await searchModel(key);
    setData(response);
  };

  // const changeModel = async (key) => {
  //   console.log(key);
  //   getModel(key);
  // };

  const insertModel = async (temp, id) => {
    await PostModel(temp, id);
    getModel();
  };

  const delModel = async (id) => {
    await DeleteModel(id);
    getModel();
  };

  useEffect(() => {
    getModel();
    getBrand();
  }, []);

  return (
    <>
      <ModelAdmin
        data={data}
        delModel={delModel}
        insertModel={insertModel}
        brand={brand}
      />
    </>
  );
};
