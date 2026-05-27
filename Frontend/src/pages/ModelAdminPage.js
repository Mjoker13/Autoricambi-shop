import { useState, useEffect } from "react";
import { searchModel, PostModel, DeleteModel, PutModel, searchMarca } from "../Api";
import { AdminLayout } from "../components/AdminLayout";
import { ModelAdmin } from "../components/ModelAdmin";

export const ModelAdminPage = () => {
  const [data,  setData]  = useState([]);
  const [brand, setBrand] = useState([]);

  const getBrand = async () => { const r = await searchMarca();  setBrand(r); };
  const getModel = async () => { const r = await searchModel();  setData(r);  };

  const insertModel  = async (temp, id) => { await PostModel(temp, id);   getModel(); };
  const delModel     = async (id)        => { await DeleteModel(id);       getModel(); };
  const updateModel  = async (temp, id)  => { await PutModel(temp, id);    getModel(); };

  useEffect(() => { getModel(); getBrand(); }, []);

  return (
    <AdminLayout
      title="Gestione Modelli"
      subtitle={`${data.length} modell${data.length !== 1 ? 'i' : 'o'} nel catalogo`}
    >
      <ModelAdmin
        data={data}
        delModel={delModel}
        insertModel={insertModel}
        updateModel={updateModel}
        brand={brand}
      />
    </AdminLayout>
  );
};
