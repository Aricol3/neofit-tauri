import FoodCard from "./FoodCard.tsx";

interface MealSectionProps {
  meal: string;
}

const MealSection = ({meal}:MealSectionProps) => {

  const onDelete=() =>console.log("delete");

  return (
    <>
      <h1 className="text-xl mt-2 mb-2">{meal}</h1>
      <div className="flex flex-col gap-2">
        <FoodCard onDelete={onDelete}/>
        <FoodCard onDelete={onDelete}/>
        <FoodCard onDelete={onDelete}/>
      </div>
    </>
  );
};

export default MealSection;