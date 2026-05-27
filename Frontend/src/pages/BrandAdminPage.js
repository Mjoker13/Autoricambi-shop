import { PostBrand, DeleteBrand, PutBrand, searchMarca } from "../Api";
import { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { BrandAdmin } from "../components/BrandAdmin";

export const BrandAdminPage = () => {
  const [data, setData] = useState([]);

  const getBrand = async (key) => {
    const response = await searchMarca(key);
    setData(response);
  };

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

  useEffect(() => { getBrand(); }, []);

  return (
    <AdminLayout
      title="Gestione Marche"
      subtitle={`${data.length} marc${data.length !== 1 ? 'he' : 'a'} nel catalogo`}
    >
      <BrandAdmin
        data={data}
        insertBrand={insertBrand}
        delBrand={delBrand}
        updateBrand={updateBrand}
      />
    </AdminLayout>
  );
};
