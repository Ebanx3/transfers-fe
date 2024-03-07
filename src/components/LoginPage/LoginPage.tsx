import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ErrorAlert from "./ErrorAlert";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorAlert, setErrorAlert] = useState("");

  const showErrorAlert = (s: string) => {
    setErrorAlert(s);
    setTimeout(() => {
      setErrorAlert("");
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-zinc-200 flex flex-col justify-center items-center">
      {isLogin ? (
        <LoginForm
          setIsLogin={() => setIsLogin(false)}
          showErrorAlert={showErrorAlert}
        />
      ) : (
        <SignupForm
          setIsLogin={() => setIsLogin(true)}
          showErrorAlert={showErrorAlert}
        />
      )}
      {errorAlert !== "" && <ErrorAlert alertMessage={errorAlert} />}
    </div>
  );
}
