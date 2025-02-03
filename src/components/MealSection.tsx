import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { addMealEntry, removeMealEntry } from "../slices/nutritionSlice";
import FoodCard from "./FoodCard.tsx";
import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ReactNode, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faAppleAlt, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";
import { impactFeedback } from "@tauri-apps/plugin-haptics";

interface MealSectionProps {
  meal: string;
}

const MealSection = ({ meal }: MealSectionProps) => {
  const dispatch = useDispatch();
  const entries = useSelector(
    (state: IRootState) => state.nutrition?.mealEntries[meal]
  );

  console.log("ENTRIES", entries);

  const onDelete = useCallback(async (idToDelete: number) => {
    await impactFeedback('medium');
    dispatch(removeMealEntry({ meal, entryId: idToDelete }));
  }, [dispatch, meal]);


  const handleAddFood = () => {
    const newEntry = {
      id: Date.now(),
      name: "6 serving • 240 g",
      description: "Old Fashioned Oats - Quaker",
      calories: 400
    };
    dispatch(addMealEntry({ meal, entry: newEntry }));
  };

  const totalCalories = useMemo(() => {
    return entries?.reduce((sum, entry) => sum + entry.calories, 0) || 0;
  }, [entries]);

  const getMealIcon = (meal: string) => {
    const icons: Record<string, ReactNode> = {
      Breakfast: <FontAwesomeIcon className="mb-1" color="#50545A" icon={faMugHot} size="lg" />,
      Lunch: <FontAwesomeIcon color="#50545A" icon={faBurger} size="lg" />,
      Dinner: <FontAwesomeIcon color="#50545A" icon={faWineGlass} size="lg" />,
      Snack: <FontAwesomeIcon color="#50545A" icon={faCookieBite} size="lg" />
    };
    return icons[meal] || "🍽️";
  };


  return (
    <Card className="mt-3 overflow-hidden meal-section" shadow="none">
      <CardHeader className="flex justify-between text-textPrimaryColor">
        <div className="text-lg font-[600] flex items-center gap-3">
          {getMealIcon(meal)}
          {meal}
        </div>
        <div>{totalCalories} kcal</div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
        <AnimatePresence>
          {entries?.length ? (
            entries.map((entry) => (
              <FoodCard
                key={entry.id}
                title={entry.description}
                subtitle={entry.name}
                calories={entry.calories}
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
