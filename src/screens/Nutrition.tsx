import { MEAL } from "../types.ts";
import MealSection from "../components/MealSection.tsx";
import DayHeader from "../components/DayHeader.tsx";
import Macronutrients from "../components/Macronutrients.tsx";
import Water from "../components/Water.tsx";

const Nutrition = () => {
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
        <MealSection meal={MEAL.DINNER} />
        <MealSection meal={MEAL.SNACK} />
      </div>
    </>
  );
};

export default Nutrition;
