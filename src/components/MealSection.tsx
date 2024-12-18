import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { addMealEntry, removeMealEntry } from "../slices/nutritionSlice";
import FoodCard from "./FoodCard.tsx";
import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface MealSectionProps {
  meal: string;
}

const MealSection = ({ meal }: MealSectionProps) => {
  const dispatch = useDispatch();
  const entries = useSelector(
    (state: IRootState) => state.nutrition?.mealEntries[meal]
  );

  const nutrition = useSelector(
    (state: IRootState) => state.nutrition
  );

  console.log("???",nutrition);

  const onDelete = (idToDelete: number) => {
    dispatch(removeMealEntry({ meal, entryId: idToDelete }));
  };

  const handleAddFood = () => {
    const newEntry = {
      id: Math.random(),
      name: "New Food Item",
      description: "Description of the item",
      calories: 400,
    };
    dispatch(addMealEntry({ meal, entry: newEntry }));
  };

  return (
    <Card className="mt-5 overflow-hidden meal-section">
      <CardHeader className="flex justify-between">
        <div className="text-xl">{meal}</div>
        <div>{entries?.reduce((sum, entry) => sum + entry.calories, 0)} kcal</div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
        <AnimatePresence>
          {entries?.map((entry) => (
            <FoodCard
              key={Math.random()}
              title={entry.description}
              subtitle={entry.name}
              calories={entry.calories}
              onDelete={() => onDelete(entry.id)}
            />
          ))}
        </AnimatePresence>
        <h1
          className="text-large font-bold text-primary p-3 w-min text-nowrap"
          onClick={handleAddFood}
        >
          ADD FOOD
        </h1>
      </CardBody>
    </Card>
  );
};

export default MealSection;
