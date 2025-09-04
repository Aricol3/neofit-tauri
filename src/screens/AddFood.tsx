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
import React, { useMemo, useState } from "react";
import type { Key } from "react";
import type { Selection } from "@react-types/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { useNavigate } from "react-router-dom";
import FoodMacronutrients from "../components/FoodMacronutrients.tsx";
import { v4 as uuidv4 } from "uuid";
import { MEAL, ROUTES } from "../types.ts";
import { formatNumber, isEnergy, parseNumber, round } from "../utils.tsx";
import { addMealEntryWithSelectedDay } from "../slices/thunks.ts";
import { IEnergy, INutritionalContents, IServingSize } from "../types/foodTypes.ts";
import { format } from "date-fns";

type ServingSizeSelectorProps = {
  servingSizes: IServingSize[];
  onSelect: (s: IServingSize) => void;
};

const ServingSizeSelector: React.FC<ServingSizeSelectorProps> = ({ servingSizes, onSelect }) => {
  const [servingSizeSelectedKeys, setServingSizeSelectedKeys] = useState<Set<Key>>(new Set());

  const selectedServingSize = useMemo(
    () => Array.from(servingSizeSelectedKeys).join(", ").replace(/_/g, ""),
    [servingSizeSelectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input
            className="select-none pointer-events-none"
            size="lg"
            label="Serving size"
            value={selectedServingSize}
            readOnly
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Serving size"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={servingSizeSelectedKeys}
        onSelectionChange={(keys: Selection) => {
          if (keys === "all") return;
          const key = Array.from(keys)[0]?.toString() ?? "";
          const selectedItem = servingSizes.find((item) => `${item.value} ${item.unit}` === key);
          if (selectedItem) {
            onSelect(selectedItem);
            setServingSizeSelectedKeys(new Set([key]));
          }
        }}
      >
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

type MealSelectorProps = {
  onSelect: (meal: MEAL) => void;
};

const MealSelector: React.FC<MealSelectorProps> = ({ onSelect }) => {
  const [mealSelectedKeys, setMealSelectedKeys] = useState<Set<Key>>(new Set());

  const selectedMeal = useMemo(
    () => Array.from(mealSelectedKeys).join(", ").replace(/_/g, ""),
    [mealSelectedKeys]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <div>
          <Input
            className="select-none pointer-events-none"
            size="lg"
            label="Meal"
            value={selectedMeal}
            readOnly
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Meal"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={mealSelectedKeys}
        onSelectionChange={(keys: Selection) => {
          if (keys === "all") return;
          const key = (Array.from(keys)[0]?.toString() ?? "") as MEAL;
          onSelect(key);
          setMealSelectedKeys(new Set([key]));
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
            <p className="text-lg">Lunch</p>
          </div>
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

const AddFood: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const scannedFood = useSelector((state: IRootState) => state.nutrition.scannedFood);

  const [selectedServingSize, setSelectedServingSize] = useState<IServingSize | null>(null);
  const [numberOfServings, setNumberOfServings] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<MEAL | undefined>(undefined);

  const handleAccept = () => {
    if (!scannedFood || !selectedMeal) return;

    const mealEntry = {
      id: uuidv4(),
      baseFood: scannedFood,
      servingSize: selectedServingSize ?? undefined,
      numberOfServings: (() => {
        const n = parseNumber(numberOfServings);
        return n === 0 ? 1 : n;
      })(),
      meal: selectedMeal
    };

    dispatch(addMealEntryWithSelectedDay({ meal: selectedMeal, entry: mealEntry }));
    navigate(ROUTES.NUTRITION);
  };

  const calculatedMacros = useMemo<INutritionalContents | null>(() => {
    if (!scannedFood || !scannedFood.nutritionalContents) return null;

    const multiplier = selectedServingSize?.nutritionMultiplier ?? 1;
    const servings = parseNumber(numberOfServings) || 1;

    const factor = multiplier * servings;

    const macros = Object.entries(scannedFood.nutritionalContents) as [
      keyof INutritionalContents,
      INutritionalContents[keyof INutritionalContents]
    ][];

    const scaled = Object.fromEntries(
      macros.map(([macro, val]) => {
        if (typeof val === "number") {
          return [macro, formatNumber(val * factor)];
        }
        if (isEnergy(val)) {
          return [macro, { ...val, value: round(val.value * factor) }];
        }
        return [macro, val];
      })
    ) as INutritionalContents;

    return scaled;
  }, [scannedFood, selectedServingSize, numberOfServings]);

  return (
    <>
      <Header title="Add Food" backRoute={ROUTES.NUTRITION} onAccept={handleAccept} />
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="flex justify-between">
            <div>
              <div className="text-textPrimaryColor text-lg font-[600]">
                {scannedFood?.description || ""}
              </div>
              <div className="text-textPrimaryColor font-[500]">
                {scannedFood?.brandName || ""}
              </div>
            </div>
          </CardHeader>
          <CardBody
            className="w-full py-0 px-3 pb-3.5 overflow-hidden text-textPrimaryColor flex gap-3"
            style={{ fontFamily: "Lexend Deca" }}
          >
            <ServingSizeSelector
              servingSizes={scannedFood?.servingSizes ?? []}
              onSelect={setSelectedServingSize}
            />

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
          calories={calculatedMacros?.energy?.value ?? 0}
          carbs={calculatedMacros?.carbohydrates ?? 0}
          fat={calculatedMacros?.fat ?? 0}
          protein={calculatedMacros?.protein ?? 0}
        />
      </div>
    </>
  );
};

export default AddFood;
