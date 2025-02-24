import { useState, ChangeEvent } from "react";
import { createFood } from "../api/foodApi.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { addToast } from "@heroui/react";

const useFoodForm = () => {
  const navigate = useNavigate();

  const scannedBarcode = useSelector(
    (state: IRootState) => state.nutrition?.scannedBarcode
  );

  const [formData, setFormData] = useState({
    brand_name: "",
    description: "",
    barcode: "",
    serving_size: "",
    servings_per_container: "",
    calories: "",
    total_fat: "",
    saturated_fat: "",
    total_carbs: "",
    sugars: "",
    protein: "",
    sodium: "",
    fiber: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const [sizeValue, sizeUnit] = formData.serving_size.split(" ");
      const foodData = {
        brand_name: formData.brand_name,
        description: formData.description,
        barcode: scannedBarcode,
        serving_sizes: [
          {
            nutrition_multiplier: 1,
            value: parseFloat(sizeValue) || 100,
            unit: sizeUnit || "grams",
            index: 1
          }
        ],
        nutritional_contents: {
          grams: parseFloat(sizeValue) || 100,
          energy: { value: parseFloat(formData.calories) || 0, unit: "calories" },
          fat: parseFloat(formData.total_fat) || 0,
          saturated_fat: parseFloat(formData.saturated_fat) || 0,
          carbohydrates: parseFloat(formData.total_carbs) || 0,
          sugar: parseFloat(formData.sugars) || 0,
          protein: parseFloat(formData.protein) || 0,
          sodium: parseFloat(formData.sodium) || 0,
          fiber: parseFloat(formData.fiber) || 0
        },
        type: "food",
        public: true,
        deleted: false,
        country_code: "RO"
      };

      await createFood(foodData);
      console.log("Food item created successfully");
      addToast({
        title: "Toast title",
        description: "Toast displayed successfully",
        color: "success",
      })
      navigate("/nutrition");
    } catch (error) {
      console.error("Error creating food item:", error);
    }
  };

  return { formData, handleInputChange, handleSubmit };
};

export default useFoodForm;
