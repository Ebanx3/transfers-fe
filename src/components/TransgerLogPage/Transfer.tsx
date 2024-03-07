import { Booking } from "../../types/transferConfirmation";

export default function Transfer({ transfer }: { transfer: Booking }) {
  return (
    <div className="p-6 bg-white border-2 flex flex-col w-full">
      <span>Transfer info:</span>
      <span>
        From: {transfer.transfers[0].pickupInformation.from.description}
      </span>
      <span>To: {transfer.transfers[0].pickupInformation.to.description}</span>
      <span>Bookinf reference: {transfer.reference}</span>
      <span>
        Status:{" "}
        <span className="font-medium text-emerald-600">
          {transfer.transfers[0].status}
        </span>
      </span>
      <button className="w-32 self-end bg-orange-600 hover:bg-orange-500 text-white py-2">
        Cancel transfer
      </button>
    </div>
  );
}
