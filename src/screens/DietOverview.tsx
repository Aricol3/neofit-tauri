import DayHeader from "../components/DayHeader.tsx";
import { Button, Card, CardBody, CardHeader, Chip, Spinner } from "@heroui/react";
import { format, isToday, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { selectMealEntriesForDate, selectWaterForDate } from "../slices/nutritionSlice.ts";
import { MEAL } from "../types.ts";
import { getMealIcon } from "../utils.tsx";
import { generateDietOverviewForDay } from "../api/foodApi.ts";
import { useEffect, useState } from "react";

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
    setIsLoading(true);
    setDietOverview(null);
    try {
      const result = await generateDietOverviewForDay(selectedDay, entriesForDay, water);
      console.log(result);
      setDietOverview(result);
    } catch (error) {
      console.error("Failed to get diet overview:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 300);

    return () => clearInterval(interval);
  }, [isLoading]);

  const [dietOverview, setDietOverview] = useState<null | {
    score: string;
    strengths: string[];
    concerns: string[];
    suggestions: string[];
  }>(null);

  const getScoreColor = (score: string) => {
    switch (score) {
      case "Poor":
        return "bg-red-500 text-white";
      case "Fair":
        return "bg-orange-500 text-white";
      case "Good":
        return "bg-lime-500 text-white";
      case "Excellent":
        return "bg-green-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <>
      <DayHeader />
      <div className="flex flex-col p-3 pt-1.5 gap-3 justify-center">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="text-white bg-primary text-xl font-[600]">
            {isLoading
              ? `One moment${dots}`
              : dietOverview
                ? "Overview"
                : `Meals for ${dayText}`}
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Spinner color="primary" size="lg" label="Loading..." labelColor="primary" />
              </div>
            ) : dietOverview ? (

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-textPrimaryColor">
                    Diet Score:
                  </div>
                  <Chip classNames={{
                    content: "font-bold",
                  }}
                        className={`${getScoreColor(dietOverview.score)} text-lg`}
                  >
                    {dietOverview.score}
                  </Chip>
                </div>

                <div>
                  <div className="font-semibold text-textPrimaryColor">Strengths:</div>
                  <ul className="list-disc list-inside text-textSecondaryColor">
                    {dietOverview.strengths.map((item, idx) => (
                      <li key={`strength-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-textPrimaryColor">Concerns:</div>
                  <ul className="list-disc list-inside text-textSecondaryColor">
                    {dietOverview.concerns.map((item, idx) => (
                      <li key={`concern-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-textPrimaryColor">Suggestions:</div>
                  <ul className="list-disc list-inside text-textSecondaryColor">
                    {dietOverview.suggestions.map((item, idx) => (
                      <li key={`suggestion-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

            ) : (

              <>
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
                          <div key={entry.id}
                               className="flex flex-row w-full items-center justify-between gap-3 my-3 h-12"
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
                      <div className="top-cup"
                           style={{ backgroundColor: "#50545A", height: "0.15rem", width: "1.05rem" }} />
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
              </>)}
          </CardBody>
        </Card>

      </div>
    </>
  );
};

export default DietOverview;