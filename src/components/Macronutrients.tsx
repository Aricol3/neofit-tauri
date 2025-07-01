import { Card, CardBody, CardHeader } from "@heroui/react";
import NewMacroProgress from "./NewMacroProgress.tsx";
import { MACRO } from "../types.ts";
import { useSelector } from "react-redux";
import { selectTotalNutritionForSelectedDay } from "../slices/thunks.ts";
import { IRootState } from "../store.ts";

const Macronutrients = () => {
  const nutritionTotals = useSelector(selectTotalNutritionForSelectedDay);
  const userProfile = useSelector((state: IRootState) => state.userProfile.profile);

  const proteinValue = nutritionTotals.protein;
  const targetProteinValue = userProfile.macros.protein;

  const carbsValue = nutritionTotals.totalCarbohydrates;
  const targetCarbsValue = userProfile.macros.carbs;

  const fatValue = nutritionTotals.totalFat;
  const targetFatValue = userProfile.macros.fat;

  return (
    // <Card className="w-full h-[180px] border-none bg-gradient-to-br from-primary to-fuchsia-500" shadow="none">
    <Card className="w-full h-[180px] border-none bg-gradient-to-tr from-purple-500 to-primary" shadow="none">
      <CardHeader className="pb-0">
        <p className="text-white text-lg font-[600]">Macronutrients</p>
      </CardHeader>
      <CardBody className="justify-center items-center p-0 flex flex-row gap-4">
        <NewMacroProgress label={MACRO.PROTEIN} value={proteinValue} targetValue={targetProteinValue} />
        <NewMacroProgress label={MACRO.CARBS} value={carbsValue} targetValue={targetCarbsValue} />
        <NewMacroProgress label={MACRO.FAT} value={fatValue} targetValue={targetFatValue} />
      </CardBody>
    </Card>
  );
};

export default Macronutrients;