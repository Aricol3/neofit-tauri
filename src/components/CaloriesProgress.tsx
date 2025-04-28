import { Card, CardBody, CardHeader, CircularProgress, Progress } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { capitalizeFirstLetter } from "../utils.ts";
import { MACRO } from "../types.ts";

const CaloriesRemaining = () => {
  return (
    <CircularProgress
      classNames={{
        svg: "w-40 h-40 drop-shadow-md",
        indicator: "stroke-white",
        track: "stroke-slate-200/30",
        value: "text-3xl font-semibold text-textPrimaryColor"
      }}
      showValueLabel={true}
      valueLabel={
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: "1" }}>
          <span style={{ textAlign: "center", fontSize: "36px", fontFamily: "Lexend Deca" }}>1863</span>
          <span style={{ textAlign: "center", fontSize: "14px" }}>remaining</span>
        </div>
      }
      strokeWidth={3}
      value={70}
      className=""
    />
  );
};

const Goal = () => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-row items-center gap-4">
        <FontAwesomeIcon icon={faFlag} size="2x" color="white" />
        <div className="text-white leading-3 pt-2">
          <p>Goal</p>
          <p className="text-lg font-bold" style={{ fontFamily: "Lexend Deca" }}>3300</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <FontAwesomeIcon icon={faBowlFood} size="2x" color="white" />
        <div className="text-white leading-3 pt-2">
          <p>Food</p>
          <p className="text-lg font-bold" style={{ fontFamily: "Lexend Deca" }}>1700</p>
        </div>
      </div>
    </div>
  );
};

const Macro = ({ label, value, targetValue }) => {
  return (
    <Progress
      label={capitalizeFirstLetter(label)}
      size="md"
      valueLabel={
        <div className="text-textPrimaryColor" style={{ fontFamily: "Lexend Deca" }}>
          <span style={{ textAlign: "right" }}>{value}/{targetValue}g</span>
        </div>
      }
      value={value}
      maxValue={targetValue}
      formatOptions={{ style: "unit", unit: "gram" }}
      showValueLabel={true}
      classNames={{
        base: "max-w-md p-4",
        // indicator: `bg-${label}Color`,
        indicator: `bg-white`,
        // track:"bg-slate-200/60",
        label: "tracking-wider text-textPrimaryColor font-semibold mb-0"
      }}
      className="p-0 gap-0"
    />
  );
};

const CaloriesProgress = () => {
  return (
    <Card className="w-full h-44 shadow-md bg-gradient-to-tl from-[#FFB457] to-[#FF705B]" shadow="none">
      <CardBody className="flex flex-row gap-4">
        <CaloriesRemaining />
        <div className="w-full flex flex-col justify-between items-center py-2">
          <Macro label={MACRO.PROTEIN} targetValue={124} value={90} />
          <Macro label={MACRO.CARBS} targetValue={242} value={167} />
          <Macro label={MACRO.FAT} targetValue={60} value={55} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CaloriesProgress;