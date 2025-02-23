import { cancel, Format, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { fetchFoodByBarcode } from "../api/foodApi.ts";
import { useDispatch } from "react-redux";
import { setScannedBarcode, setScannedFood } from "../slices/nutritionSlice.ts";

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
      console.log("Barcode scanned:", result.content);
      const food = await fetchFoodByBarcode(result.content);
      if (!food) {
        console.warn("Food item not found");
        dispatch(setScannedBarcode(result.content));
        navigate("/create-food");
        return;
      }
      console.log("Food:", food);
      dispatch(setScannedFood(food));
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
      <Button onClick={async () => {
        await cancel();
        navigate("/nutrition");
      }}>back</Button>
    </>
  );
};

export default Scanner;