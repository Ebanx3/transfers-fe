import { useNavigate } from "react-router-dom";
import { register } from "../../api/Register";

interface Props {
  setIsLogin: () => void;
  showErrorAlert: (s: string) => void;
}

export default function SignupForm({ setIsLogin, showErrorAlert }: Props) {
  const nav = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.name.value;
    const surname = form.surname.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (name.length < 3 || name.length > 30) {
      showErrorAlert("Name must contain between 3 and 30 characters");
      return;
    }

    if (surname.length < 3 || surname.length > 30) {
      showErrorAlert("Surname must contain between 3 and 30 characters");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      showErrorAlert("Invalid email");
      return;
    }

    if (!/^\+\d+$/.test(phone)) {
      showErrorAlert('Phone number must start with "+"');
      return;
    }

    if (password.length < 8) {
      showErrorAlert("Password must have at least 8 characters");
      return;
    }

    if (confirmPassword !== password) {
      showErrorAlert("Confirm password must match the password");
      return;
    }

    const response = await register({ name, surname, email, phone, password });

    if (!response.success) {
      showErrorAlert(response.message);
      return;
    }

    nav(-1);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white p-6 border-2 gap-4"
    >
      <label htmlFor="name" className="flex flex-col">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <label htmlFor="surname" className="flex flex-col">
        Surame:
        <input
          type="text"
          name="surname"
          id="surname"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <label htmlFor="email" className="flex flex-col">
        Email:
        <input
          type="text"
          name="email"
          id="email"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <label htmlFor="phone" className="flex flex-col">
        Phone:
        <input
          type="text"
          name="phone"
          id="phone"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <label htmlFor="password" className="flex flex-col">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <label htmlFor="confirmPassword" className="flex flex-col">
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="border-2 border-zinc-400 py-2"
        />
      </label>
      <button className="bg-sky-600 text-white py-2 font-medium hover:bg-sky-500">
        Create account
      </button>
      <span className="flex flex-col">
        Don you already have an account?{" "}
        <button
          className="font-medium text-sky-700 hover:text-sky-500 uppercase"
          onClick={setIsLogin}
        >
          Log in
        </button>
      </span>
    </form>
  );
}
