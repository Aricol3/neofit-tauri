import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts";
import { styled } from "@mui/material";

interface DonutChartProps {
  calories: number,
  carbs: number,
  fat: number,
  protein: number
}

const DonutChart = ({ calories, carbs, fat, protein }: DonutChartProps) => {
  const data = [
    { value: carbs },
    { value: fat },
    { value: protein }
  ];

  const size = {
    height: 130,
    width: 130,
  };

  const StyledText = styled("text")(({ fontSize }) => ({
    textAnchor: "middle",
    dominantBaseline: "central",
    fill:"primary",
    fontSize
  }));

  function PieCenterLabel() {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <text
          className="fill-textPrimaryColor font-bold"
          x={left + width / 2 + 37}
          y={top + height / 2 - 8}
          fontSize={20}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {calories}
        </text>
        <text
          className="fill-textPrimaryColor"
          x={left + width / 2 + 37}
          y={top + height / 2 + 12}
          fontSize={16}
          textAnchor="middle"
          dominantBaseline="central"
        >
          cal
        </text>
      </>
    );
  }

  return (
    <>
      <PieChart
        colors={["#40E0D0", "#A569BD", "#FFC66E"]}
        series={[
          {
            data,
            innerRadius: 40,
            outerRadius: 50,
            paddingAngle: 3,
            cornerRadius: 5,
            cx: 50
          }
        ]}
        {...size}
      >
        <PieCenterLabel />
      </PieChart>
    </>
  );
};

export default DonutChart;