import "./App.scss";
import { ToastProvider } from "@heroui/react";
import MainRoutes from "./routes.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToday } from "./slices/generalSlice.ts";
import { AppDispatch } from "./store.ts";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setToday());
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