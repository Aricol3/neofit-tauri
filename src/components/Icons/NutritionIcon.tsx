import nutritionIcon from "../../assets/nutrition.svg";
import nutritionIconActive from "../../assets/nutrition-active.svg";
import { NavIconProps } from "../../types.ts";

const NutritionIcon = ({ isActive }: NavIconProps) => {
  return (
    <>
      {isActive ?
        <img src={nutritionIconActive} alt="nutrition active icon" />
        :
        <img src={nutritionIcon} alt="nutrition icon" />
      }
    </>
  );
};

export default NutritionIcon;