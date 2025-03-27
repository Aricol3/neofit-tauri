import {
  Card,
  CardBody,
  CardHeader,
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
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { useNavigate } from "react-router-dom";
import { addMealEntry } from "../slices/nutritionSlice.ts";
import FoodMacronutrients from "../components/FoodMacronutrients.tsx";
import { ROUTES } from "../types.ts";

const ServingSizeSelector = ({ servingSizes, onSelect }: any) => {
  const [servingSizeSelectedKeys, setServingSizeSelectedKeys] = useState(new Set([""]));

  const selectedServingSize = useMemo(
    () => Array.from(servingSizeSelectedKeys).join(", ").replace(/_/g, ""),
    [servingSizeSelectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input className="select-none pointer-events-none"
                 size="lg" label="Serving size" value={selectedServingSize} />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={servingSizeSelectedKeys}
        onSelectionChange={(key) => {
          const selectedItem = servingSizes.find((item) => `${item.value} ${item.unit}` === key.currentKey);
          if (selectedItem) {
            onSelect(selectedItem);
            setServingSizeSelectedKeys(key);
          }
        }}>
        {servingSizes.map((servingSize) => {
          const key = `${servingSize.value} ${servingSize.unit}`;
          return (
            <DropdownItem key={key} color="primary">
              <p className="text-lg">{key}</p>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

const MealSelector = ({ onSelect }: any) => {
  const [mealSelectedKeys, setMealSelectedKeys] = useState(new Set([""]));

  const selectedMeal = useMemo(
    () => Array.from(mealSelectedKeys).join(", ").replace(/_/g, ""),
    [mealSelectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input className="select-none pointer-events-none"
                 size="lg" label="Meal" value={selectedMeal} />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={mealSelectedKeys}
        onSelectionChange={(key) => {
          onSelect(key.currentKey);
          setMealSelectedKeys(key);
        }}
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
  );
};

const AddFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scannedFood = useSelector((state: IRootState) => state.nutrition.scannedFood);

  const [selectedServingSize, setSelectedServingSize] = useState();
  const [numberOfServings, setNumberOfServings] = useState("");

  const [selectedMeal, setSelectedMeal] = useState();

  const handleAccept = () => {
    const foodData = {
      id: Math.random(),
      description: scannedFood?.description || "",
      name: scannedFood?.name || "",
      servingSize: selectedServingSize,
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

  const calculatedMacros = useMemo(() => {
    const multiplier = selectedServingSize?.nutrition_multiplier || 1;
    const servings = parseFloat(numberOfServings) || 1;

    return {
      calories: (scannedFood?.calories || 0) * multiplier * servings,
      carbs: (scannedFood?.totalCarbohydrates || 0) * multiplier * servings,
      fat: (scannedFood?.totalFat || 0) * multiplier * servings,
      protein: (scannedFood?.protein || 0) * multiplier * servings,
    };
  }, [scannedFood, selectedServingSize, numberOfServings]);

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

            <ServingSizeSelector servingSizes={scannedFood?.servingSizes} onSelect={setSelectedServingSize} />

            <Input
              inputMode="decimal"
              size="lg"
              label="Number of servings"
              value={numberOfServings}
              onChange={(e) => setNumberOfServings(e.target.value)}
            />

            <MealSelector onSelect={setSelectedMeal} />
          </CardBody>
        </Card>

        <FoodMacronutrients
          calories={calculatedMacros.calories}
          carbs={calculatedMacros.carbs}
          fat={calculatedMacros.fat}
          protein={calculatedMacros.protein}
        />
      </div>
    </>
  );
};

export default AddFood;