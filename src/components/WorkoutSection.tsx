import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import ActivityExample from "./ActivityCard.tsx";

const WorkoutSection = () => {

  return (
    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader className="flex justify-between text-textPrimaryColor">
        <div className="text-lg font-[600] flex items-center gap-3">
          <FontAwesomeIcon color="#50545A" icon={faDumbbell} size="lg" />
          Workout
        </div>
      </CardHeader>
      <CardBody className="w-full p-0 overflow-hidden">
        <AnimatePresence>
          {true ? (
            [...Array(4)].map(() => (
              <ActivityExample/>
            ))
          ) : (
            <div className="p-3 text-textSecondaryColor text-sm">
              You haven't logged anything yet.
            </div>
          )}
        </AnimatePresence>
        <h1
          className="text-lg font-bold text-primary p-3 w-full text-nowrap text-right"
          onClick={()=>{}}
        >
          ADD ACTIVITY
        </h1>
      </CardBody>
    </Card>
  );
};

export default WorkoutSection;
