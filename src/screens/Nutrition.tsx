import { Progress } from "@nextui-org/react";

const Nutrition = () => {
  const proteinValue = 104;
  const targetProteinValue = 165;

  const carbohydratesValue = 204;
  const targetCarbohydratesValue = 412;

  const fatValue = 79;
  const targetFatValue = 110;

  return (
    <>
      <Progress
        label="Protein"
        size="md"
        valueLabel={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", fontFamily: "monospace" }}>
            <span style={{ textAlign: "right" }}>{proteinValue}</span>
            <span style={{ textAlign: "right" }}>{targetProteinValue}</span>
            <span style={{ textAlign: "right" }}>{targetProteinValue - proteinValue}</span>
          </div>
        }
        value={proteinValue}
        maxValue={targetProteinValue}
        formatOptions={{ style: "unit", unit: "gram" }}
        showValueLabel={true}
        classNames={{
          base: "max-w-md p-4",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-pink-400 to-yellow-500",
          label: "tracking-wider font-medium text-default-600",
        }}
      />
      <Progress
        label="Carbohydrates"
        size="md"
        valueLabel={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", fontFamily: "monospace" }}>
            <span style={{ textAlign: "right" }}>{carbohydratesValue}</span>
            <span style={{ textAlign: "right" }}>{targetCarbohydratesValue}</span>
            <span style={{ textAlign: "right" }}>{targetCarbohydratesValue - carbohydratesValue}</span>
          </div>
        }
        value={carbohydratesValue}
        maxValue={targetCarbohydratesValue}
        formatOptions={{ style: "unit", unit: "gram" }}
        showValueLabel={true}
        classNames={{
          base: "max-w-md p-4",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-teal-200 to-cyan-500",
          label: "tracking-wider font-medium text-default-600",
        }}
      />
      <Progress
        label="Fat"
        size="md"
        valueLabel={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", fontFamily: "monospace" }}>
            <span style={{ textAlign: "right" }}>{fatValue}</span>
            <span style={{ textAlign: "right" }}>{targetFatValue}</span>
            <span style={{ textAlign: "right" }}>{targetFatValue - fatValue}</span>
          </div>
        }
        value={fatValue}
        maxValue={targetFatValue}
        formatOptions={{ style: "unit", unit: "gram" }}
        showValueLabel={true}
        classNames={{
          base: "max-w-md p-4",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-teal-300 via-purple-500 to-purple-700",
          label: "tracking-wider font-medium text-default-600",
        }}
      />

    </>
  );
};

export default Nutrition;
