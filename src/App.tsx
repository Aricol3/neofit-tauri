import "./App.scss";
import { ToastProvider } from "@heroui/react";
import MainRoutes from "./routes.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToday } from "./slices/generalSlice.ts";
import { AppDispatch, IRootState } from "./store.ts";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const auth = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    dispatch(setToday());
    if (!auth.accessToken) navigate("/auth");
  });

  return (
    <main className="container">
      <ToastProvider
        toastProps={{
          variant: "flat",
          hideIcon: true,
          classNames: {
            base: "z-50"
          }
        }}
        toastOffset={20}
        placement="bottom-center"
      />
      <MainRoutes />
    </main>
  );
}

export default App;