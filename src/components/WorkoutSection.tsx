import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import ActivityCard from "./ActivityCard.tsx";
import { SET_TYPE } from "../types.ts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { addActivity, resetActivitiesState, updateActivity } from "../slices/activitySlice.ts";
import { v4 as uuidv4 } from "uuid";

const WorkoutSection = () => {
  const dispatch = useDispatch();
  // dispatch(resetActivitiesState())
  const activities = useSelector((state: IRootState) => state.activity.activities);
  console.log("CE ",activities);
  const entireStore = useSelector(state => state);
  console.log('Store:', entireStore);

  const addNewActivity = () => {
    dispatch(
      addActivity({
        id: uuidv4(),
        exercise: "",
        sets: [],
        isEditing: true
      })
    );
  };

  const updateActivityName = (id: string, name: string) => {
    dispatch(updateActivity({ id, updated: { exercise: name } }));
  };

  const finishEditingTitle = (id: string, name: string) => {
    dispatch(updateActivity({ id, updated: { exercise: name, isEditing: false } }));
  };


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
          {activities.length ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activityId={activity.id}
                exercise={activity.exercise}
                sets={activity.sets}
                isEditable={activity.isEditing}
                onExerciseNameChange={(name) => updateActivityName(activity.id, name)}
                onFinishEditing={(name) => finishEditingTitle(activity.id, name)}
              />
            ))
          ) : (
            <div className="p-3 text-textSecondaryColor text-sm">
              You haven't logged anything yet.
            </div>
          )}
        </AnimatePresence>
        <h1
          className="text-lg font-bold text-primary p-3 w-full text-nowrap text-right"
          onClick={addNewActivity}
        >
          ADD ACTIVITY
        </h1>
      </CardBody>
    </Card>
  );
};

export default WorkoutSection;
