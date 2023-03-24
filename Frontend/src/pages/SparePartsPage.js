import { SparePartsList } from "../components/SparePartsList";

export const SparePartsPage = ({ sparePart, decrementQuantity }) => {
  return (
    <>
      <div className=" text-center">
        <h2 className="p-1">Spare Parts</h2>
      </div>
      <SparePartsList
        sparePart={sparePart}
        decrementQuantity={decrementQuantity}
      />
    </>
  );
};
