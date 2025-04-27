import {
  Card,
  CardBody,
  CardFooter,
  Chip
} from "@heroui/react";
import { useState } from "react";
import BottomSheet from "./BottomSheet.tsx";
import { SET_TYPE } from "../types.ts";
import { addSetToActivity, deleteActivity, ISet } from "../slices/activitySlice.ts";
import { useDispatch } from "react-redux";
import { SwipeActions } from "./SwipeActions/SwipeActions.tsx";
import { motion } from "framer-motion-legacy";

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

  const handleDelete = () => {
    dispatch(deleteActivity(activityId));
  };

  const [disableAnimation, setDisableAnimation] = useState(false);
  let startX = 0;

  const handlePointerDown = (e) => {
    startX = e.clientX;
  };

  const handlePointerUp = (e) => {
    const deltaX = Math.abs(e.clientX - startX);
    if (deltaX < 10) {
      setDisableAnimation(false);
      handleOpen();
    } else {
      setDisableAnimation(true);
    }
  };

  const handleFinishEditing = (newName: string) => {
    if (newName.trim() === "") {
      dispatch(deleteActivity(activityId));
    } else {
      onFinishEditing(newName);
    }
  };


  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 1, height: "auto" }}
        exit={{
          opacity: 0,
          height: 0,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        transition={{
          layout: { duration: 0.3 },
          initial: { duration: 0.3 },
          animate: { duration: 0.3 }
        }}
      >
        <SwipeActions.Root className="w-auto text-base will-change-transform">
          <SwipeActions.Trigger
            className="p-3 bg-white rounded-lg"
          >
            <Card
              isPressable
              disableAnimation={disableAnimation}
              onPointerDown={!isEditable ? handlePointerDown : undefined}
              onPointerUp={!isEditable ? handlePointerUp : undefined}
              shadow="none"
              className="p-3 w-full"
            >
              <CardBody className="p-0">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-2 h-5 rounded-2xl bg-primary" />
                  <div className="flex-1">
                    {isEditable ? (
                      <input
                        value={exercise}
                        onChange={(e) => onExerciseNameChange?.(e.target.value)}
                        onBlur={(e) => handleFinishEditing(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleFinishEditing(e.currentTarget.value);
                          } else if (e.key === " ") {
                            e.stopPropagation();
                          }
                        }}
                        autoFocus
                        className="w-full text-lg font-semibold text-textPrimaryColor bg-transparent outline-none border-b border-primary placeholder-transparent"
                        placeholder=" "
                      />
                    ) : (
                      <div
                        className="w-full text-lg font-semibold text-textPrimaryColor border-b border-transparent h-[32px] flex items-center"
                      >
                        {exercise}
                      </div>
                    )}
                  </div>
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
          </SwipeActions.Trigger>
          <SwipeActions.Actions wrapperClassName="rounded-lg bg-[#ff3333]">
            <SwipeActions.Action
              className="
                            h-full
                            w-24
                            aspect-square
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-2
                            text-white
                            text-xs
                            cursor-pointer
                            select-none"
              onClick={handleDelete}
            >
              <div>Delete</div>
            </SwipeActions.Action>
          </SwipeActions.Actions>
        </SwipeActions.Root>
      </motion.div>


      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} exercise={exercise} onConfirm={handleConfirm} />
    </>

  );
};

export default ActivityCard;
