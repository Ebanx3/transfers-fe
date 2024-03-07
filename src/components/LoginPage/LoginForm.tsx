import { useNavigate } from "react-router-dom";
import { login } from "../../api/Login";
import { useUserContext } from "../../context/userContext";

interface Props {
  setIsLogin: () => void;
  showErrorAlert: (s: string) => void;
}

export default function LoginForm({ setIsLogin, showErrorAlert }: Props) {
  const { setUser } = useUserContext();
  const nav = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      showErrorAlert("Invalid email");
      return;
    }

    if (password.length < 8) {
      showErrorAlert("Password must have at least 8 characters");
      return;
    }

    const response = await login({ email, password });

    if (!response.success) {
      showErrorAlert(response.message);
      return;
    }

    setUser(response.data);
    nav(-1);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 border-2"
    >
      <label htmlFor="email" className="flex flex-col">
        Email:
        <input
          type="text"
          name="email"
          id="email"
          className="border-2 py-2 border-zinc-400"
        />
      </label>
      <label htmlFor="password" className="flex flex-col">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 py-2 border-zinc-400"
        />
      </label>
      <button className="bg-sky-600 text-white py-2 font-medium hover:bg-sky-500">
        Login
      </button>
      <span className="flex flex-col">
        Do not you have an account?{" "}
        <button
          className="font-medium text-sky-700 hover:text-sky-500 uppercase"
          onClick={setIsLogin}
        >
          create one
        </button>
      </span>
    </form>
  );
}
