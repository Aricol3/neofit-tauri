import { AnimatePresence } from "framer-motion-legacy";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import ActivityCard from "./ActivityCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { v4 as uuidv4 } from "uuid";
import { addActivityWithSelectedDay, updateActivityWithSelectedDay } from "../slices/thunks.ts";
import { selectActivitiesForDate } from "../slices/activitySlice.ts";

const WorkoutSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);

  const activities = useSelector((state: IRootState) =>
    selectActivitiesForDate(state, selectedDay)
  );


  const entireStore = useSelector(state => state);
  console.log("Store:", JSON.stringify(entireStore));

  const addNewActivity = () => {
    dispatch(
      addActivityWithSelectedDay({
        id: uuidv4(),
        exercise: "",
        sets: [],
        isEditing: true
      })
    );
  };

  const updateActivityName = (id: string, name: string) => {
    dispatch(updateActivityWithSelectedDay({ id, updated: { exercise: name } }));
  };

  const finishEditingTitle = (id: string, name: string) => {
    dispatch(updateActivityWithSelectedDay({ id, updated: { exercise: name, isEditing: false } }));
  };

  return (
    <Card className="min-h-[150px] overflow-hidden meal-section shadow-md" shadow="none">
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
        <div className="p-3 text-right">
          <span
            className="text-lg font-bold text-primary cursor-pointer"
            onClick={addNewActivity}
          >
             ADD ACTIVITY
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default WorkoutSection;
