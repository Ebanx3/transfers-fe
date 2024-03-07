import TransferForm from "../Forms/TransferForm";
import TransfersContainer from "./TransfersContainer";

export default function Home() {
  return (
    <div className="flex  min-h-[calc(100vh-64px)] flex-col lg:flex-row">
      <TransferForm />
      <div className=" bg-zinc-200 flex-1 flex flex-col items-center  w-full">
        <TransfersContainer />
      </div>
    </div>
  );
}
