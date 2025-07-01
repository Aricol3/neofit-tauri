import { useState } from "react";
import SearchHeader from "../components/SearchHeader.tsx";
import { useNavigate } from "react-router-dom";
import HistorySection from "../components/HistorySection.tsx";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { setScannedFood } from "../slices/nutritionSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { fetchFoodByBarcode } from "../api/foodApi.ts";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = async (food) => {
    console.log(food);
    const selectedFood = await fetchFoodByBarcode(food.barcode);
    dispatch(setScannedFood(selectedFood));
    navigate("/add-food");
  }

  return (
    <>
      <SearchHeader setSearchResults={setResults} />

      <div className="flex flex-col p-3 pt-1.5 gap-3 justify-center">
        <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
          <CardHeader className="flex justify-between text-textPrimaryColor">
            <div className="text-lg font-[600] flex items-center gap-3">
              Results
            </div>
          </CardHeader>
          <CardBody className="w-full overflow-hidden">
            {results.length > 0 ? (
              results.map((food) => (
                <div
                  key={food._id}
                  className="flex flex-row w-full items-center justify-between gap-3 mb-1 h-12 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={()=>handleItemClick(food)}
                >
                  <div className="text-sm space-y-1">
                    <p className="font-[500] text-textPrimaryColor">
                      {food.brand_name || food.description}
                    </p>
                    <p className="font-[500] text-textSecondaryColor">
                      {food.description || food.brand_name}
                    </p>
                  </div>
                  <div
                    className="text-sm text-textSecondaryColor"
                    style={{ fontFamily: "Lexend Deca" }}
                  >
                    {food.nutritional_contents?.energy?.value ?? "--"} kcal
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found</p>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Search;
