import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";

const ActivityCard = ({ exercise, sets }) => {
  let workingSetNumber = 1;

  return (
    <Card isPressable shadow="none" className="p-3 w-full">
      <CardBody className="p-0">
        <div className="flex flex-row items-center gap-3">
          <div className="w-2 h-5 rounded-2xl bg-primary"></div>
          <p className="text-lg font-semibold text-textPrimaryColor">{exercise}</p>
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
          const isWarmup = set.warmup;
          const label = isWarmup ? "W" : `${workingSetNumber++}`;

          return (
            <div
              key={index}
              className="flex justify-between items-center w-full font-medium pt-1 pb-1 rounded-md"
            >
              <div className="w-12 flex justify-center">
                <Chip
                  className={isWarmup ? "bg-proteinColor text-textPrimaryColor p-0 min-w-8 text-center" : "bg-primary text-white p-0 min-w-8 text-center"}>
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
  );
};

const ActivityExample = () => {
  const activity = {
    exercise: "Machine Row",
    sets: [
      { reps: 15, weight: 30, warmup: true },
      { reps: 12, weight: 35, warmup: true },
      { reps: 10, weight: 40, warmup: false },
      { reps: 8, weight: 45, warmup: false },
      { reps: 6, weight: 50, warmup: false },
    ]
  };

  return <ActivityCard exercise={activity.exercise} sets={activity.sets} />;
};

export default ActivityExample;
