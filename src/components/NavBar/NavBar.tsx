import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="h-16 bg-white flex items-center justify-between px-2 md:px-32 border-b-2 ">
      <NavLink to={"/"} className="text-4xl font-bold">
        Transfers
      </NavLink>
      <ul className="flex gap-4">
        <li>
          <NavLink to={"/"} className="font-medium hover:opacity-60">
            Home
          </NavLink>
        </li>
        {user === null ? (
          <li>
            <NavLink to={"/login"} className="font-medium hover:opacity-60">
              Login
            </NavLink>
          </li>
        ) : (
          <div className="relative">
            <button
              className="font-medium hover:opacity-60"
              onClick={() => setUserMenuVisible(!userMenuVisible)}
            >
              {user.name}
            </button>
            {userMenuVisible && (
              <UserMenu closeMenu={() => setUserMenuVisible(false)} />
            )}
          </div>
        )}
      </ul>
    </div>
  );
}
