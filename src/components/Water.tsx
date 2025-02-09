import { Card, CardBody, CardHeader } from "@nextui-org/react";
import NewMacroProgress from "./NewMacroProgress.tsx";
import { MACRO } from "../types.ts";
import WaterCup from "./WaterCup.tsx";

const Water = () => {

  return (
    <Card className="w-full h-[150px] border-none bg-waterBackground" shadow="none">
      <CardHeader className="pb-0 flex flex-row justify-between">
        <p className="text-white text-lg font-[600]">Water</p>
        <p className="text-white text-sm font-[600]">0,75 / 3,5 l</p>
      </CardHeader>
      <CardBody className="justify-center items-center p-0 flex flex-row gap-2">
        <WaterCup isFilled={true}/>
        <WaterCup isFilled={true}/>
        <WaterCup isFilled={true}/>
        <WaterCup isFilled={false}/>
        <WaterCup isFilled={false}/>
        <WaterCup isFilled={false}/>
        <WaterCup isFilled={false}/>
        <WaterCup isFilled={false}/>
      </CardBody>
    </Card>
  );
};

export default Water;