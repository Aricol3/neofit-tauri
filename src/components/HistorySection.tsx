import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import HistoryCard from "./HistoryCard.tsx";


const HistorySection = () => {
  const [entries, setEntries] = useState([
    { id: 1, title: "Chicken Strips American Style With Curry", subtitle: "900 cal, 500 gram, Culinea" },
    { id: 2, title: "Apple Pie", subtitle: "Somebody somewhere" },
    { id: 3, title: "Another apple pie", subtitle: "Another description" }
  ]);

  const onDelete = (idToDelete: number) => {
    setEntries(currentSwipers =>
      currentSwipers.filter(swiper => swiper.id !== idToDelete)
    );
  };


  return (
    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader className="flex justify-between text-textPrimaryColor">
        <div className="text-lg font-[600] flex items-center gap-3">
          History
        </div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
          {entries?.length ? (
            entries.map((swiper) => (
              <HistoryCard
                key={swiper.id}
                {...swiper}
                onDelete={() => onDelete(swiper.id)}
              />
            ))
          ) : (
            <div className="p-3 text-textSecondaryColor text-sm">
              You haven't logged anything yet.
            </div>
          )}
      </CardBody>
    </Card>
  );
};

export default HistorySection;
