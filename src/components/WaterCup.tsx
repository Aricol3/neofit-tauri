import "./WaterCup.scss";

interface WaterCupProps {
  isFilled: boolean;
  isNextToFill?: boolean;
  onClick: () => void;
}

const WaterCup = ({ isFilled, isNextToFill, onClick }: WaterCupProps) => {
  return (
    <div className="flex flex-col justify-center items-center relative" onClick={onClick}>
      <div className="top-cup"></div>
      <div className="cup relative">
        {isFilled ? <div className="water filled"></div> : isNextToFill ? <div className="plus"></div> : null}
      </div>
      <div className={`bottom-cup ${isFilled ? 'filled' : ''}`}></div>
    </div>
  );
};

export default WaterCup;
