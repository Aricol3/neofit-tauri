import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store.ts";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HeroUIProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </HeroUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
