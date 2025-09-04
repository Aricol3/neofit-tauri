import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { selectMealEntriesForDate } from "../slices/nutritionSlice";
import FoodCard from "./FoodCard.tsx";
import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useCallback, useMemo } from "react";
import { impactFeedback } from "@tauri-apps/plugin-haptics";
import { removeMealEntryWithSelectedDay } from "../slices/thunks.ts";
import { formatNumber, getMealIcon, round } from "../utils.tsx";
import { IMealEntry } from "../types/foodTypes.ts";

interface MealSectionProps {
  meal: string;
}

const MealSection = ({ meal }: MealSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);

  const entriesForDay = useSelector((state: IRootState) =>
    selectMealEntriesForDate(state, selectedDay)
  );

  const entries:IMealEntry[] = entriesForDay[meal] || [];


  const onDelete = useCallback(async (idToDelete: string) => {
    await impactFeedback("medium");
    dispatch(removeMealEntryWithSelectedDay({ meal, entryId: idToDelete }));
  }, [dispatch, meal]);


  const handleAddFood = () => {
    // const newEntry = {
    //   id: Date.now(),
    //   name: "6 serving • 240 g",
    //   description: "Chicken Strips With Curry",
    //   calories: 400
    // };
    // dispatch(addMealEntryWithSelectedDay({ meal, entry: newEntry }));
  };

  const totalCalories = useMemo(() => {
    return entries?.reduce((sum, entry) => sum + round(entry.baseFood.nutritionalContents.energy.value * entry.servingSize.nutritionMultiplier * entry.numberOfServings), 0) || 0;
  }, [entries]);


  return (
    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader className="flex justify-between text-textPrimaryColor">
        <div className="text-lg font-[600] flex items-center gap-3">
          {getMealIcon(meal)}
          {meal}
        </div>
        <div style={{ fontFamily: "Lexend Deca" }}>{totalCalories} kcal</div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
        <AnimatePresence>
          {entries?.length ? (
            entries.map((entry) => (
              <FoodCard
                key={entry.id}
                foodId={entry.id}
                title={entry.baseFood.description}
                subtitle={`${entry.baseFood.brandName} • ${formatNumber(entry.servingSize.value * entry.numberOfServings)} ${entry.servingSize?.unit}`}
                calories={round(entry.baseFood.nutritionalContents.energy.value * entry.servingSize.nutritionMultiplier * entry.numberOfServings)}
                onDelete={() => onDelete(entry.id)}
              />
            ))
          ) : (
            <div className="p-3 text-textSecondaryColor text-sm">
              You haven't logged anything yet.
            </div>
          )}
        </AnimatePresence>
        <h1
          className="text-lg font-bold text-primary p-3 w-full text-nowrap text-right"
          onClick={handleAddFood}
        >
          ADD FOOD
        </h1>
      </CardBody>
    </Card>
  );
};

export default MealSection;
