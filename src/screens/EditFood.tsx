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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faMugHot, faWineGlass, faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { useNavigate, useParams } from "react-router-dom";
import { selectMealEntriesForDate } from "../slices/nutritionSlice.ts";
import FoodMacronutrients from "../components/FoodMacronutrients.tsx";
import { MEAL, ROUTES } from "../types.ts";
import { formatNumber, isEnergy, parseNumber, round } from "../utils.tsx";
import { updateMealEntryWithSelectedDay } from "../slices/thunks.ts";
import { IMealEntry, INutritionalContents } from "../types/foodTypes.ts";

const ServingSizeSelector = ({ servingSizes, onSelect, defaultValue }: any) => {
  const [servingSizeSelectedKeys, setServingSizeSelectedKeys] = useState(new Set([defaultValue]));

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

const MealSelector = ({ onSelect, defaultValue }: any) => {
  const [mealSelectedKeys, setMealSelectedKeys] = useState(new Set([defaultValue]));

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

const EditFood = () => {
  const { entryId } = useParams();
  console.log("entryId", entryId);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);

  const mealEntries = useSelector((state: IRootState) =>
    selectMealEntriesForDate(state, selectedDay)
  );

  const entry: IMealEntry = useMemo(() => {
    for (const meal in mealEntries) {
      const found = mealEntries[meal].find((e) => e.id === entryId);
      if (found) return { ...found, meal: meal as MEAL };
    }
    return null;
  }, [entryId, mealEntries]);

  const [selectedServingSize, setSelectedServingSize] = useState(entry?.servingSize);
  const [numberOfServings, setNumberOfServings] = useState(entry?.numberOfServings.toString() || "");
  const [selectedMeal, setSelectedMeal] = useState<MEAL>(entry?.meal);

  if (!entry) return <div className="p-4 text-red-500">Food entry not found.</div>;

  const handleAccept = () => {
    const updatedEntry = {
      ...entry,
      servingSize: selectedServingSize!,
      numberOfServings: (() => {
        const n = parseNumber(numberOfServings);
        return n === 0 ? 1 : n;
      })(),
      meal: selectedMeal!
    };

    dispatch(updateMealEntryWithSelectedDay({ meal: selectedMeal!, entry: updatedEntry }));
    navigate(ROUTES.NUTRITION);
  };

  const calculatedMacros = useMemo(() => {
    if (!entry || !entry.baseFood.nutritionalContents) return null;

    const baseFood = entry.baseFood;
    const multiplier = selectedServingSize?.nutritionMultiplier ?? 1;
    const servings = parseNumber(numberOfServings) || 1;

    const factor = multiplier * servings;

    const macros = Object.entries(baseFood.nutritionalContents) as [
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
  }, [entry?.baseFood, selectedServingSize, numberOfServings]);

  return (
    <>
      <Header title="Edit Food" backRoute={ROUTES.NUTRITION} onAccept={handleAccept} />
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="flex justify-between">
            <div>
              <div className="text-textPrimaryColor text-lg font-[600]">
                {entry.baseFood.description}
              </div>
              <div className="text-textPrimaryColor font-[500]">
                {entry.baseFood.brandName}
              </div>
            </div>
          </CardHeader>
          <CardBody className="w-full py-0 px-3 pb-3.5 overflow-hidden text-textPrimaryColor flex gap-3"
                    style={{ fontFamily: "Lexend Deca" }}>

            <ServingSizeSelector
              servingSizes={entry.baseFood.servingSizes}
              onSelect={setSelectedServingSize}
              defaultValue={`${entry.servingSize.value} ${entry.servingSize.unit}`}
            />
            <Input
              inputMode="decimal"
              size="lg"
              label="Number of servings"
              value={numberOfServings}
              onChange={(e) => setNumberOfServings(e.target.value)}
            />
            <MealSelector
              onSelect={setSelectedMeal}
              defaultValue={entry.meal}
            />
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

export default EditFood;
