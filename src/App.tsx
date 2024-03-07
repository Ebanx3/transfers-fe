import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Home from "./components/Home/Home";
import TransferContextProvider from "./context/TransferContext";
import TransferPage from "./components/TransferPage/TransferPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserContextProvider from "./context/userContext";
import TransferLogPage from "./components/TransgerLogPage/TransferLogPage";

function App() {
  return (
    <main className="bg-zinc-200">
      <UserContextProvider>
        <TransferContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/transferLog" element={<TransferLogPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </TransferContextProvider>
      </UserContextProvider>
    </main>
  );
}

export default App;
