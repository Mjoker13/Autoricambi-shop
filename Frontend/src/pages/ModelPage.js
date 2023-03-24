import { ModelList } from "../components/ModelList";

export const ModelPage = ({ model }) => {
  return (
    <>
      <div className=" text-center">
        <h2 className="p-1">Model</h2>
      </div>
      <ModelList model={model} />
    </>
  );
};
