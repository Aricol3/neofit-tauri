import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from "@heroui/react";
import Header from "../components/Header.tsx";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";
import DonutChart from "../components/DonutChart.tsx";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { scan } from "@tauri-apps/plugin-barcode-scanner";
import { useNavigate } from "react-router-dom";
import { addMealEntry } from "../slices/nutritionSlice.ts";
import FoodMacronutrients from "../components/FoodMacronutrients.tsx";
import DayHeader from "../components/DayHeader.tsx";
import { ROUTES } from "../types.ts";

const AddFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scannedFood = useSelector((state: IRootState) => state.nutrition.scannedFood);

  const [mealSelectedKeys, setMealSelectedKeys] = useState(new Set([""]));
  const [servingSizeSelectedKeys, setServingSizeSelectedKeys] = useState(new Set([""]));
  const [numberOfServings, setNumberOfServings] = useState("");

  const selectedMeal = useMemo(
    () => Array.from(mealSelectedKeys).join(", ").replaceAll("_", " "),
    [mealSelectedKeys]
  );

  const selectedServingSize = useMemo(
    () => Array.from(servingSizeSelectedKeys).join(", ").replaceAll("_", " "),
    [servingSizeSelectedKeys]
  );

  const handleAccept = () => {
    const foodData = {
      id: Math.random(),
      description: scannedFood?.description || "",
      name: scannedFood?.name || "",
      servingSize:selectedServingSize,
      numberOfServings,
      meal: selectedMeal,
      calories: scannedFood?.calories,
      totalCarbohydrates: scannedFood?.totalCarbohydrates || 0,
      totalFat: scannedFood?.totalFat || 0,
      protein: scannedFood?.protein || 0
    };
    console.log(foodData);
    dispatch(addMealEntry({ meal: selectedMeal, entry: foodData }));
  };

  return (
    <>
      <Header title="Add Food" backRoute={ROUTES.NUTRITION} onAccept={handleAccept} />
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="flex justify-between">
            <div>
              <div className="text-textPrimaryColor text-lg font-[600]">
                Chicken Strips American Style
              </div>
              <div className="text-textPrimaryColor font-[500]">
                Culinea
              </div>
            </div>
          </CardHeader>
          <CardBody className="w-full py-0 px-3 pb-3.5 overflow-hidden text-textPrimaryColor flex gap-3"
                    style={{ fontFamily: "Lexend Deca" }}>

            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <div>
                  <Input  className="select-none pointer-events-none"
                          size="lg" label="Serving size" value={selectedServingSize} />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={servingSizeSelectedKeys}
                onSelectionChange={setServingSizeSelectedKeys}
              >
                <DropdownItem key="100g" color="primary">
                    <p className="text-lg">100g</p>
                </DropdownItem>
                <DropdownItem key="30g" color="primary">
                  <p className="text-lg">30g</p>
                </DropdownItem>
                <DropdownItem key="50g" color="primary">
                  <p className="text-lg">50g</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Input
              inputMode="decimal"
              size="lg"
              label="Number of servings"
              value={numberOfServings}
              onChange={(e) => setNumberOfServings(e.target.value)}
            />
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <div>
                  <Input  className="select-none pointer-events-none"
                         size="lg" label="Meal" value={selectedMeal} />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={mealSelectedKeys}
                onSelectionChange={setMealSelectedKeys}
              >
                <DropdownItem key="Breakfast" color="primary">
                  <div className="flex flex-row text-center items-center gap-2">
                    <FontAwesomeIcon color="#50545A" icon={faMugHot} />
                    <p className="text-lg">Breakfast</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="Lunch" color="primary">
                  <div className="flex flex-row text-center items-center gap-2">
                    <FontAwesomeIcon color="#50545A" icon={faBurger} />
                    <p className="text-lg">Lunch</p></div>
                </DropdownItem>
                <DropdownItem key="Dinner" color="primary">
                  <div className="flex flex-row text-center items-center gap-2">
                    <FontAwesomeIcon color="#50545A" icon={faWineGlass} />
                    <p className="text-lg">Dinner</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="Snack" color="primary">
                  <div className="flex flex-row text-center items-center gap-2">
                    <FontAwesomeIcon color="#50545A" icon={faCookieBite} />
                    <p className="text-lg">Snack</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardBody>
        </Card>

        <FoodMacronutrients calories={scannedFood?.calories} carbs={scannedFood?.totalCarbohydrates}
                            fat={scannedFood?.totalFat} protein={scannedFood?.protein} />
      </div>
    </>
  );
};

export default AddFood;