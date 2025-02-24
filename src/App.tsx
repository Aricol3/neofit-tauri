import React, { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.scss";
import { Button, ToastProvider } from "@heroui/react";
import { scan, Format, checkPermissions, requestPermissions } from "@tauri-apps/plugin-barcode-scanner";
import MainRoutes from "./routes.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [scanResult, setScanResult] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  const scanBarcode = async () => {
    setScanResult("inainte");
    setScanResult("dupa");

    let permission = await checkPermissions();


    if (permission === "prompt") {
      permission = await requestPermissions();
    }
    if (permission !== "granted") {
      setScanResult("Camera permission denied");
      return;
    }

    try {
      const result = await scan({
        windowed: false,
        formats: [Format.EAN8, Format.EAN13]
      });
      setScanResult(`Scanned result: ${result.content}`);
      console.log("Barcode scanned:", result.content);
    } catch (error) {
      console.error("Failed to scan barcode:", error);
      setScanResult("Failed to scan barcode");
    }
  };

  return (
    <main className="container">
          <ToastProvider
            toastProps={{
              variant: "flat",
              hideIcon: true,
              classNames: {
                base: "z-50",
              },
            }}
            toastOffset={20}
            placement="bottom-center"
          />
        <MainRoutes />
    </main>
  );
}

export default App;