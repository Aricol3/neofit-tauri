import DayHeader from "../components/DayHeader.tsx";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { format, isToday, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { selectMealEntriesForDate } from "../slices/nutritionSlice.ts";
import { MEAL } from "../types.ts";
import { getMealIcon } from "../utils.tsx";

const DietOverview = () => {
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);
  const dayText = isToday(parseISO(selectedDay))
    ? "Today"
    : format(parseISO(selectedDay), "d MMMM");

  const meals = Object.values(MEAL);

  const entriesForDay = useSelector((state: IRootState) =>
    selectMealEntriesForDate(state, selectedDay)
  );

  const caloriesPerMeal: Record<MEAL, number> = Object.values(MEAL).reduce((acc, meal) => {
    acc[meal] = entriesForDay[meal]?.reduce((sum, entry) => sum + entry.calories, 0) || 0;
    return acc;
  }, {} as Record<MEAL, number>);



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
                      <div className="flex flex-row w-full items-center justify-between gap-3 my-3 h-12"
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
            <Button color="primary" className="text-white text-md font-semibold mt-5">Generate Overview</Button>
          </CardBody>
        </Card>

      </div>
    </>
  );
};

export default DietOverview;