import { Link } from "react-router-dom";
import { useTransferContext } from "../../context/TransferContext";
import { useUserContext } from "../../context/userContext";
import { ConfirmTransfer } from "../../api/ConfirmTransfer";
import { useState } from "react";
import LoaderIcon from "../Forms/LoaderIcon";

export default function TransferPage() {
  const { selectedTransfer } = useTransferContext();
  const { user, setUser } = useUserContext();
  const [transferConfirmed, setTransferCondirmed] = useState(() => {
    if (user != null) {
      const index = user.transfersLog.findIndex(
        (transfer) => transfer.rateKey === selectedTransfer!.rateKey
      );
      return index < 0 ? false : true;
    }
    return false;
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleCLick = async () => {
    if (!selectedTransfer) return;
    setLoading(true);
    const response = await ConfirmTransfer(selectedTransfer);
    setLoading(false);
    console.log(response);
    if (response.booking.bookings[0].status === "CONFIRMED") {
      setTransferCondirmed(true);
      setUser(response.user);
    }
  };

  const componentToShow = () => {
    if (loading)
      return (
        <div className="relative h-10">
          <LoaderIcon />
        </div>
      );
    if (user === null)
      return (
        <div className="flex justify-end items-center gap-4">
          <span>Must be logged in to take a transfer</span>
          <Link
            to={"/login"}
            className="bg-sky-600 text-white py-2 px-4 hover:bg-sky-500"
          >
            Login
          </Link>
        </div>
      );
    if (user !== null)
      return (
        <button
          className={
            transferConfirmed
              ? "bg-emerald-500 self-end py-2 px-6 text-white font-bold uppercase rounded-lg "
              : "bg-blue-500 self-end py-2 px-6 text-white font-bold hover:bg-blue-400 uppercase rounded-lg "
          }
          onClick={handleCLick}
          disabled={transferConfirmed}
        >
          {transferConfirmed ? "Confirmed" : "Take transfer"}
        </button>
      );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-200 flex justify-center items-center">
      <article className="flex flex-col bg-white p-8 gap-10 text-lg max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col">
            <span>
              <span className="font-bold">From: </span>
              {selectedTransfer?.pickupInformation.from.description}
            </span>
            <span>
              <span className="font-bold">To: </span>
              {selectedTransfer?.pickupInformation.to.description}
            </span>
            <span>
              <span className="font-bold">Date: </span>
              {selectedTransfer!.pickupInformation.date.toString()}
            </span>
            <span>
              <span className="font-bold">Time: </span>
              {selectedTransfer!.pickupInformation.time}
            </span>
          </div>
          <img src={selectedTransfer?.content.images[0].url} alt="Vehicle" />
        </div>

        <div>
          <span className="font-bold">Pickup description: </span>
          <p>{selectedTransfer?.pickupInformation.pickup.description}</p>
        </div>

        <ul>
          <span className="font-bold">Details:</span>
          {selectedTransfer?.content.transferDetailInfo.map((detail) => (
            <li key={detail.id}>{detail.description}</li>
          ))}
        </ul>

        <span className="font-bold text-2xl">
          Price: €{selectedTransfer!.price.totalAmount}
        </span>
        {componentToShow()}
      </article>
    </div>
  );
}
