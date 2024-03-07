import { useState, useContext, createContext, useEffect } from "react";
import { User } from "../types/user";

interface IUserContext {
  user: User | null;
  setUser: (u: User | null) => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("transfers-user") ?? "null")
  );

  useEffect(() => {
    localStorage.setItem("transfers-user", JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
