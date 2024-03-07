import { useState, useContext, createContext, useEffect } from "react";
import { Transfer } from "../types/transfer";
import { Available, Service } from "../types/transfersAvailables";
import { GetAvailablesTransfers } from "../api/GetAvialables";

interface ITransferContext {
  transferFilters: Transfer | null;
  formatAndSetTF: (t: Transfer) => void;
  transfersAvailables: Available | null;
  selectedTransfer: Service | null;
  setSelectedTransfer: (s: Service) => void;
}

const transferContext = createContext<ITransferContext>({} as ITransferContext);

export default function TransferContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transferFilters, setTransferFilters] = useState<Transfer | null>(null);
  const [transfersAvailables, setTransfersAvailables] = useState(
    JSON.parse(sessionStorage.getItem("availablesTransfers") ?? "null")
  );
  const [selectedTransfer, setSelectedTransfer] = useState<Service | null>(
    JSON.parse(localStorage.getItem("selectedTransfer") ?? "null")
  );

  const formatAndSetTF = (props: Transfer) => {
    setTransferFilters(props);
  };

  useEffect(() => {
    (async () => {
      if (!transferFilters) return;
      const data = await GetAvailablesTransfers(transferFilters);
      setTransfersAvailables(data);
    })();
  }, [transferFilters]);

  useEffect(() => {
    localStorage.setItem("selectedTransfer", JSON.stringify(selectedTransfer));
  }, [selectedTransfer]);

  useEffect(() => {
    sessionStorage.setItem(
      "availablesTransfers",
      JSON.stringify(transfersAvailables)
    );
  }, [transfersAvailables]);

  return (
    <transferContext.Provider
      value={{
        transferFilters,
        formatAndSetTF,
        transfersAvailables,
        selectedTransfer,
        setSelectedTransfer,
      }}
    >
      {children}
    </transferContext.Provider>
  );
}

export const useTransferContext = () => useContext(transferContext);
