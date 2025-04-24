export interface NavIconProps {
  isActive: boolean;
}

export enum MACRO {
  CARBS = "carbs",
  FAT = "fat",
  PROTEIN = "protein"
}

export enum MEAL {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  SNACK = "Snack"
}

export enum SET_TYPE {
  WARMUP = "Warmup",
  NORMAL = "Normal",
  DROP = "Drop",
  SUPER = "Super"
}

export enum ROUTES {
  NUTRITION = "/nutrition",
}

export interface IScannedFood {
  _id: string;
  barcode: string;
  name: string;
  description: string;
  servingSizes: {
    nutritionMultiplier: number;
    id: string;
    value: number;
    unit: string;
    index: number;
  }[];
  verified: boolean;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  totalCarbohydrates: number;
  netCarbs: number;
  sugars: number;
  protein: number;
  sodium: number;
  fiber: number;
  public: boolean;
  deleted: boolean;
  countryCode: string;
  version: string;
}


export interface IMealEntry {
  description: string;
  name: string;
  servingSize: string;
  numberOfServings: string;
  meal: MEAL;
  calories: number
  totalCarbohydrates: number;
  totalFat: number;
  protein: number;
}

interface IServingSize {
  nutrition_multiplier: number;
  value: number;
  unit: string;
  index: number;
}

interface IEnergy {
  value: number;
  unit: string;
}

interface INutritionalContents {
  grams: number;
  energy: IEnergy;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  sodium: number;
  fiber: number;
}

interface IFoodData {
  brand_name: string;
  description: string;
  serving_sizes: IServingSize[];
  nutritional_contents: INutritionalContents;
  type: string;
  public: boolean;
  deleted: boolean;
  country_code: string;
}
