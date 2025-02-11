import { CircularProgress } from "@nextui-org/react";
import { capitalizeFirstLetter } from "../utils.ts";

interface MacroProgressProps {
  label: string,
  value: number,
  targetValue: number
}

const NewMacroProgress = ({ label, value, targetValue }: MacroProgressProps) => {
  return (
    <div className="justify-center items-center p-0 flex flex-col">
      <CircularProgress
        classNames={{
          // svg: "w-24 h-24 drop-shadow-md",
          svg: "w-24 h-24",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-lg text-white"
        }}
        showValueLabel={true}
        valueLabel={
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
            <span style={{ textAlign: "center", fontSize: "24px", fontFamily: "Lexend Deca",fontWeight:"700" }}>{value}</span>
            <span style={{ textAlign: "center", fontSize: "12px", fontFamily: "Lexend Deca",fontWeight:"700" }}>/ {targetValue} g</span>
          </div>
        }
        strokeWidth={2.5}
        value={value}
        maxValue={targetValue}
      />
      <p className="font-[600] text-white">{capitalizeFirstLetter(label)}</p>
    </div>
  );
};

export default NewMacroProgress;