import { cancel, Format, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { getFoodByBarcode } from "../api/foodApi.ts";

const Scanner = () => {
  const navigate = useNavigate();

  const scanBarcode = async () => {
    try {
      const result = await scan({
        windowed: true,
        formats: [Format.EAN8, Format.EAN13]
      });
      console.log("Barcode scanned:", result.content);
      const food = await getFoodByBarcode(result.content);
      console.log("Food:", food);
      navigate("/nutrition");
    } catch (error) {
      console.error("Failed to scan barcode:", error);
    }
  };

  useEffect(() => {
    scanBarcode();
  });

  return (
    <>
      <Button onClick={async () => {
        await cancel();
        navigate(-1);
      }}>back</Button>
    </>
  );
};

export default Scanner;