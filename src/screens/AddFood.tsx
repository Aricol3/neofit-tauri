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

const AddFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scannedFood = useSelector((state: IRootState) => state.nutrition.scannedFood);

  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [servingSize, setServingSize] = useState(scannedFood?.servingSize || "");
  const [numberOfServings, setNumberOfServings] = useState("");

  const selectedMeal = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleAccept = () => {
    const foodData = {
      id: Math.random(),
      description: scannedFood?.description || "",
      name: scannedFood?.name || "",
      servingSize,
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
      <Header title="Add Food" onAccept={handleAccept} />
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
            <Input
              classNames={{
                inputWrapper: "bg-white shadow-none",
                input:"placeholder:text-textSecondaryColor"
              }}
              size="lg"
              label="Serving Size"
              placeholder="100g"
              variant="bordered"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            />
            <Input
              classNames={{
                inputWrapper: "bg-white shadow-none",
                input:"placeholder:text-textSecondaryColor"
              }}
              inputMode="decimal"
              size="lg"
              label="Number of servings"
              placeholder="1"
              variant="bordered"
              value={numberOfServings}
              onChange={(e) => setNumberOfServings(e.target.value)}
            />
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <div>
                  <Input classNames={{
                    inputWrapper: "bg-white shadow-none",
                    input:"placeholder:text-textSecondaryColor"
                  }} className="select-none pointer-events-none" variant="bordered"
                         size="lg" label="Meal" value={selectedMeal} />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
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