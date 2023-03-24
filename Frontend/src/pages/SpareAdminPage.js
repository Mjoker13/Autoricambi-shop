import { useState, useEffect } from "react";
import {
  searchModel,
  PostSparePart,
  DeleteSparePart,
  searchSparePart,
  PutSparePart,
} from "../Api";
import { SparePartAdmin } from "../components/SparePartAdmin";

export const SpareAdminPage = () => {
  const [model, setModel] = useState([]);
  const [data, setData] = useState([]);

  const getModel = async (key) => {
    const response = await searchModel(key);
    setModel(response);
  };

  const getSparePart = async (key) => {
    const response = await searchSparePart(key);
    setData(response);
  };

  // const changeSparePart = async (key) => {
  //   console.log(key);
  //   getSparePart(key);
  // };

  const insertSparePart = async (temp, id) => {
    await PostSparePart(temp, id);
    getSparePart();
  };
  const delSparePart = async (id) => {
    await DeleteSparePart(id);
    getSparePart();
  };
  const updateSparePart = async (temp, id) => {
    await PutSparePart(temp, id);
    getSparePart();
  };

  useEffect(() => {
    getSparePart();
    getModel();
  }, []);

  return (
    <>
      <SparePartAdmin
        data={data}
        updateSparePart={updateSparePart}
        delSparePart={delSparePart}
        insertSparePart={insertSparePart}
        model={model}
      />
    </>
  );
};
