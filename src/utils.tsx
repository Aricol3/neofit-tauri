import { ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";
import { IEnergy, IMealEntry, INutritionalContents } from "./types/foodTypes.ts";

export const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(",", ".")) || 0;
};

export const round = (value: number) => Math.round(value);
export const formatNumber = (value: number) => Number(value.toFixed(1));

export const getMealIcon = (meal: string) => {
  const icons: Record<string, ReactNode> = {
    Breakfast: <FontAwesomeIcon className="mb-1" color="#50545A" icon={faMugHot} size="lg" />,
    Lunch: <FontAwesomeIcon color="#50545A" icon={faBurger} size="lg" />,
    Dinner: <FontAwesomeIcon color="#50545A" icon={faWineGlass} size="lg" />,
    Snack: <FontAwesomeIcon color="#50545A" icon={faCookieBite} size="lg" />
  };
  return icons[meal] || "🍽️";
};

export function isEnergy(x: unknown): x is IEnergy {
  return (
    typeof x === "object" &&
    x !== null &&
    "value" in x &&
    typeof (x as any).value === "number" &&
    "unit" in x &&
    typeof (x as any).unit === "string"
  );
}

export const calculateEntryScaledMacros = (entry: IMealEntry) => {
  const multiplier = entry.servingSize.nutritionMultiplier;
  const servings = entry.numberOfServings;

  const factor = multiplier * servings;

  const macros = Object.entries(entry.baseFood.nutritionalContents) as [
    keyof INutritionalContents,
    INutritionalContents[keyof INutritionalContents]
  ][];

  const scaled = Object.fromEntries(
    macros.map(([macro, val]) => {
      if (typeof val === "number") {
        return [macro, formatNumber(val * factor)];
      }
      if (isEnergy(val)) {
        return [macro, { ...val, value: round(val.value * factor) }];
      }
      return [macro, val];
    })
  ) as INutritionalContents;

  return scaled;
}