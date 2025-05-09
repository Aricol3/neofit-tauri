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
  NORMAL = "Working",
  DROP = "Drop",
}

export enum ROUTES {
  NUTRITION = "/nutrition",
}

export interface IScannedFood {
  _id: string;
  barcode: string;
  name: string;
  description: string;
  servingSizes: IServingSize[];
  verified: boolean;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  totalCarbohydrates: number;
  netCarbs: number;
  sugar: number;
  protein: number;
  sodium: number;
  fiber: number;
  public: boolean;
  deleted: boolean;
  countryCode: string;
  version: string;
}


export interface IMealEntry {
  id: string;
  baseFood: IScannedFood;
  description: string;
  name: string;
  servingSizes: IServingSize[];
  servingSize: string;
  numberOfServings: number;
  meal: MEAL;
  calories: number;
  totalCarbohydrates: number;
  totalFat: number;
  protein: number;

  saturatedFat: number;
  sugar:number;
  fiber: number;
  sodium: number;
}

interface IServingSize {
  id: string;
  nutritionMultiplier: number;
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
