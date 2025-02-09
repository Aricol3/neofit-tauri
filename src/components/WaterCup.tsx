import "./WaterCup.scss";

interface WaterCupProps {
  isFilled: boolean;
  isNextToFill?: boolean;
}

const WaterCup = ({ isFilled, isNextToFill }: WaterCupProps) => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="top-cup"></div>
      <div className="cup relative">
        {isFilled ? <div className="water filled"></div> : isNextToFill ? <div className="plus"></div> : null}
      </div>
      <div className={`bottom-cup ${isFilled ? 'filled' : ''}`}></div>
    </div>
  );
};

export default WaterCup;
