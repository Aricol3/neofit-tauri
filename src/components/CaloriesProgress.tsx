import { CircularProgress } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";

const CaloriesProgress = () => {
  return (
    <div className="flex flex-row space-x-6">
      <CircularProgress
        classNames={{
          svg: "w-48 h-48 drop-shadow-md",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-3xl font-semibold text-white"
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
      />
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
    </div>
  );
};

export default CaloriesProgress;