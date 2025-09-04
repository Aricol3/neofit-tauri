import { cancel, Format, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFoodByBarcode } from "../api/foodApi.ts";
import { useDispatch } from "react-redux";
import { setScannedBarcode, setScannedFood } from "../slices/nutritionSlice.ts";
import Header from "../components/Header.tsx";
import { ROUTES } from "../types.ts";

const Scanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.backgroundColor = "transparent";
    return () => {
      document.documentElement.style.backgroundColor = "#f5f9fa";
    };
  }, []);

  const scanBarcode = async () => {
    try {
      const result = await scan({
        windowed: true,
        formats: [Format.EAN8, Format.EAN13]
      });

      const barcode = result.content;

      const food = await fetchFoodByBarcode(barcode);

      console.log("SCANNED FOOD", food);

      if (!food) {
        dispatch(setScannedBarcode(barcode));
        navigate("/create-food");
        return;
      }

      dispatch(setScannedFood(food));
      console.log("BA TE SETEZI???",);
      navigate("/add-food");
    } catch (error) {
      console.error("Failed to scan barcode:", error);
    }
  };

  useEffect(() => {
    scanBarcode();
  });

  return (
    <>
      <Header title="Scan Barcode" backRoute={ROUTES.NUTRITION} onBack={async () => await cancel()} />

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-48 h-48">
          <div className="absolute top-0 left-0 w-6 h-0.5 bg-primary rounded" />
          <div className="absolute top-0 left-0 w-0.5 h-6 bg-primary rounded" />

          <div className="absolute top-0 right-0 w-6 h-0.5 bg-primary rounded" />
          <div className="absolute top-0 right-0 w-0.5 h-6 bg-primary rounded" />

          <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-primary rounded" />
          <div className="absolute bottom-0 left-0 w-0.5 h-6 bg-primary rounded" />

          <div className="absolute bottom-0 right-0 w-6 h-0.5 bg-primary rounded" />
          <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-primary rounded" />
        </div>
      </div>

    </>
  );
};

export default Scanner;