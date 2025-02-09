import "./WaterCup.scss";

interface WaterCupProps {
  isFilled: boolean;
}

const WaterCup = ({ isFilled }: WaterCupProps) => {

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="top-cup"></div>
      <div className="cup relative">
        {isFilled ? <div className="water filled"></div> : <div className="plus"></div>}
      </div>
      <div className={`bottom-cup ${isFilled ? 'filled' : ''}`}></div>
    </div>
  );
};

export default WaterCup;