import { Divider, Progress } from "@nextui-org/react";
import FoodCard from "../components/FoodCard.tsx";
import MacroProgress from "../components/MacroProgress.tsx";
import { MACRO } from "../types.ts";

const Nutrition = () => {
  const proteinValue = 104;
  const targetProteinValue = 165;

  const carbohydratesValue = 204;
  const targetCarbohydratesValue = 412;

  const fatValue = 79;
  const targetFatValue = 110;

  return (
    <div className="p-3">
      <h1 className="text-xl">Calories Remaining</h1>

      <p>3.300 - 0 = 3.300 remaining</p>
      <MacroProgress label={MACRO.PROTEIN} value={proteinValue} targetValue={targetProteinValue}/>
      <MacroProgress label={MACRO.CARBS} value={carbohydratesValue} targetValue={targetCarbohydratesValue}/>
      <MacroProgress label={MACRO.FAT} value={fatValue} targetValue={targetFatValue}/>
      <Divider />
      <h1 className="text-xl mt-2 mb-2">Breakfast</h1>
      <div className="flex flex-col gap-4">
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
      <Divider />
      <h1 className="text-xl mt-2 mb-2">Lunch</h1>
      <div className="flex flex-col gap-4">
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
      <Divider />
      <h1 className="text-xl mt-2 mb-2">Dinner</h1>
      <div className="flex flex-col gap-4">
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
    </div>
  );
};

export default Nutrition;
