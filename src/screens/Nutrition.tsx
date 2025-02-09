import { Divider } from "@nextui-org/react";
import MacroProgress from "../components/MacroProgress.tsx";
import { MACRO, MEAL } from "../types.ts";
import MealSection from "../components/MealSection.tsx";
import DayHeader from "../components/DayHeader.tsx";
import Macronutrients from "../components/Macronutrients.tsx";
import Water from "../components/Water.tsx";

const Nutrition = () => {
  const proteinValue = 104;
  const targetProteinValue = 165;

  const carbohydratesValue = 204;
  const targetCarbohydratesValue = 412;

  const fatValue = 79;
  const targetFatValue = 110;

  return (
    <>
      <DayHeader />
      {/*<h1 className="text-xl">Calories Remaining</h1>*/}
      {/*<p>3.300 - 0 = 3.300 remaining</p>*/}
      {/*<MacroProgress label={MACRO.PROTEIN} value={proteinValue} targetValue={targetProteinValue} />*/}
      {/*<MacroProgress label={MACRO.CARBS} value={carbohydratesValue} targetValue={targetCarbohydratesValue} />*/}
      {/*<MacroProgress label={MACRO.FAT} value={fatValue} targetValue={targetFatValue} />*/}
      {/*<Divider />*/}
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <Macronutrients/>
        <Water/>
        <MealSection meal={MEAL.BREAKFAST} />
        <MealSection meal={MEAL.LUNCH} />
        <MealSection meal={MEAL.SNACK} />
        <MealSection meal={MEAL.DINNER} />
      </div>

      <div className="p-3">


      </div>
    </>
  );
};

export default Nutrition;
