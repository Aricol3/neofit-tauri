import {
  Card,
  CardBody,
  CardFooter,
  Chip
} from "@heroui/react";
import { useState } from "react";
import BottomSheet from "./BottomSheet.tsx";
import { SET_TYPE } from "../types.ts";
import { addSetToActivity, ISet } from "../slices/activitySlice.ts";
import { useDispatch } from "react-redux";

const ActivityCard = ({ activityId, exercise, sets, isEditable, onExerciseNameChange, onFinishEditing }) => {
  const dispatch = useDispatch();
  let workingSetNumber = 1;
  const [isOpen, setIsOpen] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    setIsOpen(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleConfirm = (setData: ISet) => {
    dispatch(addSetToActivity({ activityId, newSet: setData }));
  };

  return (
    <>
      <Card isPressable={!isEditable}
            onPress={!isEditable ? handleOpen : undefined} shadow="none" className="p-3 w-full">
        <CardBody className="p-0">
          <div className="flex flex-row items-center gap-3">
            <div className="w-2 h-5 rounded-2xl bg-primary"></div>
            {isEditable ? (
              <input
                value={exercise}
                onChange={(e) => onExerciseNameChange?.(e.target.value)}
                onBlur={(e) => onFinishEditing?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onFinishEditing?.(e.currentTarget.value);
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
                autoFocus
                className="text-lg font-semibold text-textPrimaryColor bg-transparent outline-none border-b border-primary"
              />
            ) : (
              <p className="text-lg font-semibold text-textPrimaryColor">
                {exercise}
              </p>
            )}

          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 pt-0">
          <div
            className="flex justify-between items-center w-full mt-2 text-textPrimaryColor font-semibold text-sm pb-1">
            <p className="w-12 text-center">Set</p>
            <p className="w-12 text-center">Reps</p>
            <p className="w-12 text-center">kg</p>
          </div>
          {sets.map((set, index) => {
            let label = "";
            if (set.type === SET_TYPE.WARMUP) {
              label = "W";
            } else {
              label = `${workingSetNumber++}`;
            }

            return (
              <div
                key={index}
                className="flex justify-between items-center w-full font-medium pt-1 pb-1 rounded-md"
              >
                <div className="w-12 flex justify-center">
                  <Chip
                    className={label == "W" ? "bg-proteinColor text-textPrimaryColor p-0 min-w-8 text-center" : "bg-primary text-white p-0 min-w-8 text-center"}>
                    <p className="font-bold">{label}</p>
                  </Chip>
                </div>
                <p className="w-12 text-center font-bold text-textPrimaryColor"
                >{set.reps}</p>
                <p className="w-12 text-center font-bold text-textPrimaryColor"
                >{set.weight}</p>
              </div>
            );
          })}
        </CardFooter>
      </Card>

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} exercise={exercise} onConfirm={handleConfirm} />
    </>

  );
};

export default ActivityCard;
