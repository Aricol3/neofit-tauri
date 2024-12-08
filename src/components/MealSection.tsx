import FoodCard from "./FoodCard.tsx";

const MealSection = () => {

  const onDelete=() =>console.log("delete");

  return (
    <>
      <h1 className="text-xl mt-2 mb-2">Breakfast</h1>
      <div className="flex flex-col gap-4">
        <FoodCard onDelete={onDelete}/>
        <FoodCard onDelete={onDelete}/>
        <FoodCard onDelete={onDelete}/>
      </div>
    </>
  );
};

export default MealSection;