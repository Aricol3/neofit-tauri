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

export interface IScannedFood {
  _id: string,
  barcode: string,
  name: string,
  description: string,
  servingSize: string,
  servingsPerContainer: string,
  calories: number,
  totalFat: number,
  saturatedFat: number,
  totalCarbohydrates: number,
  sugars: number,
  protein: number,
  sodium: number,
  fiber: number
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