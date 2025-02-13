import DonutChart from "./DonutChart.tsx";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import FoodCard from "./FoodCard.tsx";

interface FoodMacronutrientsProps {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

const FoodMacronutrients = ({ calories, carbs, fat, protein }: FoodMacronutrientsProps) => {

  return (
    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader className="flex justify-between text-textPrimaryColor">
        <div className="text-lg font-[600] flex items-center gap-3">
          Nutritional info
        </div>
      </CardHeader>
      <CardBody className="w-full py-0 px-3 overflow-hidden text-textPrimaryColor" style={{fontFamily:"Lexend Deca"}}>
          <div className="flex flex-row items-center">
            <div style={{ width: "130px", height: "130px" }}>
              <DonutChart calories={calories} carbs={carbs}
                          fat={fat} protein={protein} />
            </div>
            <div className="w-full flex flex-row justify-between items-center pl-3 pr-3">
              <div className="flex flex-col items-center">
                <div className="text-sm" style={{ color: "#37bfb1" }}>41%</div>
                <div className="text-md">{carbs} g</div>
                <div className="text-sm font-normal">Carbs</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm" style={{ color: "#5d24b7" }}>28%</div>
                <div className="text-md">{fat} g</div>
                <div className="text-sm font-normal">Fat</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm" style={{ color: "#d39459" }}>32%</div>
                <div className="text-md">{protein} g</div>
                <div className="text-sm font-normal">Protein</div>
              </div>
            </div>
          </div>
      </CardBody>
    </Card>
  );
};

export default FoodMacronutrients;