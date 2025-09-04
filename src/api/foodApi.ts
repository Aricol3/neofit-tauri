import { authFetch } from "./authApi.ts";
import { IFoodDataAPI } from "../types/foodTypes.ts";

const baseUrl = "http://192.168.100.137:8080";


export const fetchFoodByBarcode = async (barcode: string) => {
  try {
    const url = `${baseUrl}/food?barcode=${barcode}`;
    const response = await authFetch(url, {
      method: "GET"
    });
    const data = await response.json();
    const food = data.foodItem;
    console.log("response",food);

    if (response.ok) {
      const scannedFood: IFoodDataAPI = {
        description: food.description,
        brandName: food.brand_name,
        servingSizes: food.serving_sizes.map((size: any) => ({
          nutritionMultiplier: size.nutrition_multiplier,
          value: size.value,
          unit: size.unit,
          index: size.index,
          id: size._id
        })),
        nutritionalContents: food.nutritional_contents,
      };

      console.log("SCANNED FOOD", scannedFood);

      return scannedFood;
    } else {
      console.error("Failed to fetch food:", food.error);
    }
  } catch (error) {
    console.error("Error fetching food by barcode:", error);
  }
};

export const createFood = async (foodData: any) => {
  try {
    const url = `${baseUrl}/food`;
    const response = await authFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(foodData)
    });

    if (!response.ok) {
      throw new Error("Failed to create food item");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const generateDietOverviewForDay = async (date: string, meals: any, water: any, profile: any) => {
  try {
    const url = `${baseUrl}/food/overview`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date,
        meals,
        water,
        profile
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate diet overview");
    }

    return response.json();
  } catch (error) {
    console.error("Error in generateDietOverviewForDay:", error);
    throw error;
  }
};

export const searchFoods = async (query: string) => {
  try {
    const url = `${baseUrl}/food/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      method: "GET"
    });
    if (!response.ok) throw new Error("Search failed");

    const data = await response.json();
    return data.foods || [];
  } catch (error) {
    console.error("Error searching foods:", error);
    return [];
  }
};

export const createFoodLog = async (
  token: string,
  payload: {
    food_id: string;
    serving_size_id: string;
    amount: number;
    meal_type: string;
    date: string;
    notes?: string;
    custom_meal?: boolean;
  }
) => {
  const res = await fetch("/api/food-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create food log");
  return res.json();
};
