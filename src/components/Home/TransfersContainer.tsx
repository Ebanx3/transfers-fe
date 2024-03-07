import { useTransferContext } from "../../context/TransferContext";
import Transfer from "./Transfer";

export default function TransfersContainer() {
  const { transfersAvailables } = useTransferContext();
  return (
    <>
      <h1 className="text-xl md:text-4xl font-bold text-zinc-800 my-4 uppercase text-center">
        Manage Your Transfers Easily and Quickly
      </h1>
      {transfersAvailables == null || transfersAvailables.services == null ? (
        <strong className="text-2xl text-zinc-500 ">
          There are no transfers yet, complete or modify the form to get them!
        </strong>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
          {transfersAvailables.services.map((service) => (
            <Transfer key={service.id} service={service} />
          ))}
        </div>
      )}
    </>
  );
}
