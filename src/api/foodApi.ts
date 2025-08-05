import { IScannedFood } from "../types.ts";

const baseUrl = "http://192.168.100.132:8080";


export const fetchFoodByBarcode = async (barcode: string) => {
  try {
    const url = `${baseUrl}/food?barcode=${barcode}`;
    const response = await fetch(url, {
      method: "GET"
    });
    const data = await response.json();

    if (response.ok) {
      const scannedFood: IScannedFood = {
        _id: data.food._id,
        barcode: data.food.barcode,
        name: data.food.brand_name,
        description: data.food.description,
        servingSizes: data.food.serving_sizes.map((size: any) => ({
          nutritionMultiplier: size.nutrition_multiplier,
          id: size._id,
          value: size.value,
          unit: size.unit,
          index: size.index
        })),
        verified: data.food.verified,
        calories: data.food.nutritional_contents.energy?.value || 0,
        totalFat: data.food.nutritional_contents.fat || 0,
        saturatedFat: data.food.nutritional_contents.saturated_fat || 0,
        totalCarbohydrates: data.food.nutritional_contents.carbohydrates || 0,
        netCarbs: data.food.nutritional_contents.net_carbs || 0,
        sugar: data.food.nutritional_contents.sugar || 0,
        protein: data.food.nutritional_contents.protein || 0,
        sodium: data.food.nutritional_contents.sodium || 0,
        fiber: data.food.nutritional_contents.fiber || 0,
        public: data.food.public,
        deleted: data.food.deleted,
        countryCode: data.food.country_code,
        version: data.food.version
      };

      console.log("SCANNED FOOD", scannedFood);

      return scannedFood;
    } else {
      console.error("Failed to fetch food:", data.error);
    }
  } catch (error) {
    console.error("Error fetching food by barcode:", error);
  }
};

export const createFood = async (foodData: any) => {
  try {
    const url = `${baseUrl}/food`;
    const response = await fetch(url, {
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


export const generateDietOverviewForDay = async (date: string, meals: any, water: any, profile:any) => {
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
