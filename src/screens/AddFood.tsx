import { Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
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
      <div className="flex flex-col m-4 gap-5">
        <div>
          <h1 className="text-xl font-bold">{scannedFood?.description}</h1>
          <p>{scannedFood?.name}</p>
        </div>
        <Divider />
        <Input
          size="lg"
          label="Serving Size"
          placeholder="100g"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
        <Input
          size="lg"
          label="Number of servings"
          placeholder="1"
          value={numberOfServings}
          onChange={(e) => setNumberOfServings(e.target.value)}
        />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div>
              <Input className="select-none pointer-events-none" size="lg" label="Meal" value={selectedMeal} />
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
        <div className="flex flex-row items-center">
          <div style={{ width: "130px", height: "130px" }}>
            <DonutChart calories={scannedFood.calories} carbs={scannedFood.totalCarbohydrates}
                        fat={scannedFood.totalFat} protein={scannedFood.protein} />
          </div>
          <div className="w-full flex flex-row justify-between items-center pl-3 pr-3">
            <div className="flex flex-col items-center">
              <div className="text-sm" style={{ color: "#37bfb1" }}>41%</div>
              <div className="text-md">{scannedFood.totalCarbohydrates} g</div>
              <div className="text-sm font-normal">Carbs</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm" style={{ color: "#5d24b7" }}>28%</div>
              <div className="text-md">{scannedFood.totalFat} g</div>
              <div className="text-sm font-normal">Fat</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm" style={{ color: "#d39459" }}>32%</div>
              <div className="text-md">{scannedFood.protein} g</div>
              <div className="text-sm font-normal">Protein</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFood;