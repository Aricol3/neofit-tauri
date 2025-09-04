import { MEAL } from "../types.ts";


export interface IServingSize {
  _id: string;
  nutritionMultiplier: number;
  value: number;
  unit: string;
  index: number;
  default:boolean;
}

export interface IEnergy {
  value: number;
  unit: string;
}

export interface INutritionalContents {
  energy: IEnergy,

  // Required Macros
  protein: number,
  fat: number,
  carbohydrates: number,

  // Optional Fat Subtypes
  saturated_fat: number,
  polyunsaturated_fat: number,
  monounsaturated_fat: number,
  trans_fat: number,

  // Optional Micros and Add-ons
  cholesterol: number,
  sodium: number,
  potassium: number,

  fiber: number,
  sugar: number,
  added_sugars: number,
  sugar_alcohols: number,

  // Vitamins & Minerals
  vitamin_a: number,
  vitamin_c: number,
  vitamin_d: number,
  calcium: number,
  iron: number
}

export interface IFoodDataAPI {
  description: string;
  brandName: string;
  servingSizes: IServingSize[];
  nutritionalContents: INutritionalContents;
}

export interface IMealEntry {
  id: string;
  baseFood: IFoodDataAPI;

  servingSize: IServingSize;
  numberOfServings: number;
  meal: MEAL;
}
