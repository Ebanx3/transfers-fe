import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { logout } from "../../api/logout";

export default function UserMenu({ closeMenu }: { closeMenu: () => void }) {
  const { setUser } = useUserContext();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    closeMenu();
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white border-2 justify-center absolute top-8 -right-2 w-36 font-medium">
      <Link to="/transferLog" className="hover:text-zinc-500">
        Transfer Log
      </Link>
      <button className="hover:text-zinc-500" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
