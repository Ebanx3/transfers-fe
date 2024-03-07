import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Transfer from "./Transfer";

export default function TransferLogPage() {
  const { user } = useUserContext();
  const nav = useNavigate();

  useEffect(() => {
    if (user === null) {
      nav("/");
    }
  }, []);
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-5xl m-auto bg-zinc-200 flex flex-col gap-6 justify-center items-center">
      {user?.transfersLog.map((transfer) => (
        <Transfer key={transfer.reference} transfer={transfer} />
      ))}
    </div>
  );
}
