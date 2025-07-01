import { Card, CardBody, CardHeader } from "@heroui/react";
import NewMacroProgress from "./NewMacroProgress.tsx";
import { MACRO } from "../types.ts";

const Macronutrients = () => {
  const proteinValue = 6;
  const targetProteinValue = 180;

  const carbsValue = 60;
  const targetCarbsValue = 370;

  const fatValue = 30;
  const targetFatValue = 70;

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