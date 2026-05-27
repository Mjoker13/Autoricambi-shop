import { useState, useEffect } from "react";
import { searchModel, PostSparePart, DeleteSparePart, searchSparePart, PutSparePart } from "../Api";
import { AdminLayout } from "../components/AdminLayout";
import { SparePartAdmin } from "../components/SparePartAdmin";

export const SpareAdminPage = () => {
  const [model, setModel] = useState([]);
  const [data,  setData]  = useState([]);

  const getModel     = async () => { const r = await searchModel();     setModel(r); };
  const getSparePart = async () => { const r = await searchSparePart(); setData(r);  };

  const insertSparePart = async (temp, id) => { await PostSparePart(temp, id); getSparePart(); };
  const delSparePart    = async (id)        => { await DeleteSparePart(id);    getSparePart(); };
  const updateSparePart = async (temp, id)  => { await PutSparePart(temp, id); getSparePart(); };

  useEffect(() => { getSparePart(); getModel(); }, []);

  const outOfStockCount = data.filter((el) => el.quantity === 0).length;

  return (
    <AdminLayout
      title="Gestione Ricambi"
      subtitle={
        `${data.length} ricamb${data.length !== 1 ? 'i' : 'io'} nel catalogo` +
        (outOfStockCount > 0 ? ` — ⚠️ ${outOfStockCount} esaurit${outOfStockCount !== 1 ? 'i' : 'o'}` : '')
      }
    >
      <SparePartAdmin
        data={data}
        model={model}
        insertSparePart={insertSparePart}
        delSparePart={delSparePart}
        updateSparePart={updateSparePart}
      />
    </AdminLayout>
  );
};
