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
  HOME = "/",
}
