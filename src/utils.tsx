import { ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";

export const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(",", ".")) || 0;
}

export const getMealIcon = (meal: string) => {
  const icons: Record<string, ReactNode> = {
    Breakfast: <FontAwesomeIcon className="mb-1" color="#50545A" icon={faMugHot} size="lg" />,
    Lunch: <FontAwesomeIcon color="#50545A" icon={faBurger} size="lg" />,
    Dinner: <FontAwesomeIcon color="#50545A" icon={faWineGlass} size="lg" />,
    Snack: <FontAwesomeIcon color="#50545A" icon={faCookieBite} size="lg" />
  };
  return icons[meal] || "🍽️";
};