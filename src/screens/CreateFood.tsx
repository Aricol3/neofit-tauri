import { Divider, Input, Button } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import Header from "../components/Header.tsx";
import { createFood } from "../api/foodApi.ts";

const CreateFood = () => {
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
      const foodData = {
        brand_name: formData.brand_name,
        description: formData.description,
        barcode: formData.barcode,
        serving_sizes: [
          {
            nutrition_multiplier: 1,
            value: parseFloat(formData.serving_size.split(" ")[0]) || 100,
            unit: formData.serving_size.split(" ")[1] || "grams",
            index: 1
          }
        ],
        nutritional_contents: {
          grams: parseFloat(formData.serving_size.split(" ")[0]) || 100,
          energy: {
            value: parseFloat(formData.calories) || 0,
            unit: "calories"
          },
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
    } catch (error) {
      console.error("Error creating food item:", error);
    }
  };

  return (
    <>
      <Header title="Create Food" onAccept={handleSubmit} />
      <div className="flex flex-col m-4 mt-5 gap-5">
        <Input
          size="lg"
          label="Barcode"
          placeholder=""
          name="barcode"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Brand Name"
          placeholder="ex. Alfredo"
          name="brand_name"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Description"
          placeholder="ex. Chicken Breast"
          name="description"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Serving Size"
          placeholder="ex. 1 cup / 100g"
          name="serving_size"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Servings per container"
          placeholder="1"
          name="servings_per_container"
          onChange={handleInputChange}
        />
        <Divider />
        <Input
          size="lg"
          label="Calories"
          name="calories"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Total fat (g)"
          name="total_fat"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Saturated fat (g)"
          name="saturated_fat"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Total Carbohydrates (g)"
          name="total_carbs"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Sugars (g)"
          name="sugars"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Protein (g)"
          name="protein"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Sodium (g)"
          name="sodium"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Fiber (g)"
          name="fiber"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default CreateFood;
