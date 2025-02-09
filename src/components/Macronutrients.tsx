import { Card, CardBody, CardHeader } from "@nextui-org/react";
import NewMacroProgress from "./NewMacroProgress.tsx";
import { MACRO } from "../types.ts";

const Macronutrients = () => {

  return (
    <Card className="w-full h-[180px] border-none bg-gradient-to-br from-primary to-fuchsia-500" shadow="none">
      <CardHeader className="pb-0">
        <p className="text-white text-lg font-[600]">Macronutrients</p>
      </CardHeader>
      <CardBody className="justify-center items-center p-0 flex flex-row gap-4">
        <NewMacroProgress label={MACRO.PROTEIN} value={148} targetValue={215} />
        <NewMacroProgress label={MACRO.CARBS} value={200} targetValue={406} />
        <NewMacroProgress label={MACRO.FAT} value={64} targetValue={134} />
      </CardBody>
    </Card>
  );
};

export default Macronutrients;