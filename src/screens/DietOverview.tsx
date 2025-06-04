import DayHeader from "../components/DayHeader.tsx";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { format, isToday, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { selectMealEntriesForDate, selectWaterForDate } from "../slices/nutritionSlice.ts";
import { MEAL } from "../types.ts";
import { getMealIcon } from "../utils.tsx";
import { generateDietOverviewForDay } from "../api/foodApi.ts";
import WaterCup from "../components/WaterCup.tsx";

const DietOverview = () => {
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);
  const dayText = isToday(parseISO(selectedDay))
    ? "Today"
    : format(parseISO(selectedDay), "d MMMM");

  const meals = Object.values(MEAL);

  const entriesForDay = useSelector((state: IRootState) =>
    selectMealEntriesForDate(state, selectedDay)
  );

  const waterForDay = useSelector((state: IRootState) =>
    selectWaterForDate(state, selectedDay)
  );

  const cupSizeMl = useSelector((state: IRootState) => state.nutrition.cupSizeMl);
  const water = waterForDay * cupSizeMl;

  const caloriesPerMeal: Record<MEAL, number> = Object.values(MEAL).reduce((acc, meal) => {
    acc[meal] = entriesForDay[meal]?.reduce((sum, entry) => sum + entry.calories, 0) || 0;
    return acc;
  }, {} as Record<MEAL, number>);

  const handleGenerateDietOverviewForDay = async () => {
    try {
      const result = await generateDietOverviewForDay(selectedDay, entriesForDay, water);
      console.log("Diet feedback:", result);
    } catch (error) {
      console.error("Failed to get diet overview:", error);
    }
  };

  return (
    <>
      <DayHeader />
      <div className="flex flex-col p-3 pt-1.5 gap-3 justify-center">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="text-white bg-primary text-xl font-[600]">
            Meals for {dayText}
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            {meals.map((meal) => (
              <div key={meal}>
                <div className="flex justify-between text-textPrimaryColor">
                  <div className="text-lg font-[600] flex items-center gap-3">
                    {getMealIcon(meal)}
                    {meal}
                  </div>
                  <div style={{ fontFamily: "Lexend Deca" }}>{caloriesPerMeal[meal]} kcal</div>
                </div>

                <div>
                  {entriesForDay[meal]?.length ? (
                    entriesForDay[meal].map((entry) => (
                      <div key={entry.id} className="flex flex-row w-full items-center justify-between gap-3 my-3 h-12"
                      >
                        <div className="text-sm">
                          <p className="font-[600] text-textPrimaryColor">{entry.description}</p>
                          <p
                            className="font-[500] text-textSecondaryColor">{`${entry.name} • ${entry.servingSize?.value * entry.numberOfServings} g`}</p>
                        </div>
                        <div className="text-sm text-textSecondaryColor" style={{ fontFamily: "Lexend Deca" }}>
                          {entry.calories} kcal
                        </div>
                      </div>
                    ))) : (
                    <div className="py-3 text-textSecondaryColor text-sm">
                      You haven't logged anything.
                    </div>
                  )}

                </div>
              </div>
            ))}

            <div className="flex justify-between text-textPrimaryColor">
              <div className="text-lg font-[600] flex items-center gap-3">
                <div className="flex flex-col justify-center items-center relative">
                  <div className="top-cup" style={{ backgroundColor: "#50545A", height: "0.15rem", width: "1.05rem" }} />
                  <div className="cup relative"
                       style={{ backgroundColor: "#50545A", height: "1.3rem", width: "1.3rem" }} />
                  <div className="bottom-cup"
                       style={{ backgroundColor: "#50545A", height: "0.15rem", width: "0.8rem" }} />
                </div>
                Water
              </div>
              <div style={{ fontFamily: "Lexend Deca" }}>{water} ml</div>
            </div>
            <Button color="primary" className="text-white text-md font-semibold mt-3"
                    onPress={handleGenerateDietOverviewForDay}>Generate Overview</Button>
          </CardBody>
        </Card>

      </div>
    </>
  );
};

export default DietOverview;