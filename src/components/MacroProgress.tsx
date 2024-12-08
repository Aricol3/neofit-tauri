import { Progress } from "@nextui-org/react";
import { capitalizeFirstLetter } from "../utils.ts";

interface MacroProgressProps {
  label: string,
  value: number,
  targetValue: number
}

const MacroProgress = ({ label, value, targetValue }: MacroProgressProps) => {
  return (
    <Progress
      label={capitalizeFirstLetter(label)}
      size="md"
      valueLabel={
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", fontFamily: "IBM Plex Mono" }}>
          <span style={{ textAlign: "right" }}>{value}</span>
          <span style={{ textAlign: "right" }}>{targetValue}</span>
          <span style={{ textAlign: "right" }}>{targetValue - value}</span>
        </div>
      }
      value={value}
      maxValue={targetValue}
      formatOptions={{ style: "unit", unit: "gram" }}
      showValueLabel={true}
      classNames={{
        base: "max-w-md p-4",
        indicator: `bg-${label}Color`,
        label: "tracking-wider"
      }}
    />
  );
};

export default MacroProgress;