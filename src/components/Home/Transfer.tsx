import { Link } from "react-router-dom";
import { Service } from "../../types/transfersAvailables";
import { useTransferContext } from "../../context/TransferContext";

export default function Transfer({ service }: { service: Service }) {
  const { setSelectedTransfer } = useTransferContext();

  const handleClick = () => {
    setSelectedTransfer(service);
  };

  return (
    <Link
      to={"/transfer"}
      className="bg-white p-4 flex flex-col justify-between hover:scale-105 border-2 border-zinc-300"
      onClick={handleClick}
    >
      <img
        src={service.content.images[0].url}
        alt="vehicle"
        className="w-full"
      />
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span>
            Transfer type:{" "}
            <span className="font-bold">{service.transferType}</span>
          </span>
          <span>
            Category:{" "}
            <span className="font-bold uppercase">{service.category.name}</span>
          </span>
        </div>
        <span className="text-2xl md:text-4xl">
          € {service.price.totalAmount}
        </span>
      </div>
    </Link>
  );
}
