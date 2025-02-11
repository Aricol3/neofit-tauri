import { Card, CardBody, CardHeader } from "@nextui-org/react";
import NewMacroProgress from "./NewMacroProgress.tsx";
import { MACRO } from "../types.ts";

const Macronutrients = () => {
  const proteinValue = 104;
  const targetProteinValue = 165;

  const carbsValue = 204;
  const targetCarbsValue = 412;

  const fatValue = 79;
  const targetFatValue = 110;

  return (
    <Card className="w-full h-[180px] border-none bg-gradient-to-br from-primary to-fuchsia-500" shadow="none">
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