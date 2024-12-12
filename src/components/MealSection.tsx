import FoodCard from "./FoodCard.tsx";
import { AnimatePresence } from "framer-motion-legacy";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface MealSectionProps {
  meal: string;
}

const MealSection = ({ meal }: MealSectionProps) => {
  const [swipers, setSwipers] = useState([
    { id: 1, title: "Chicken Strips American Style With Curry", subtitle: "Culinea, 500 gram", calories: 900 },
    { id: 2, title: "Apple Pie", subtitle: "Somebody somewhere", calories: 750 },
    { id: 3, title: "Another apple pie", subtitle: "Another description", calories: 600 }
  ]);

  const onDelete = (idToDelete: number) => {
    setSwipers(currentSwipers =>
      currentSwipers.filter(swiper => swiper.id !== idToDelete)
    );
  };

  return (
    <Card className="mt-5 overflow-hidden meal-section">
      <CardHeader className="flex justify-between">
        <div className="text-xl">{meal}</div>
        <div>1900</div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
        <AnimatePresence>
          {swipers.map((swiper) => (
            <FoodCard
              key={swiper.id}
              {...swiper}
              onDelete={() => onDelete(swiper.id)}
            />
          ))}
        </AnimatePresence>
        {/*<Divider/>*/}
        <h1 className="text-large font-bold text-primary p-3 w-min text-nowrap"
            onClick={() => console.log("add food")}>ADD FOOD</h1>
      </CardBody>
    </Card>
  );
};

export default MealSection;