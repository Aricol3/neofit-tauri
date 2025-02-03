import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const DayPicker = () => {
  return (
    <div className="flex gap-3 text-textSecondaryColor">
      <FontAwesomeIcon icon={faAngleLeft} />
      <FontAwesomeIcon icon={faCalendar} />
      <p className="-mt-0.5 font-[600]">2 Feb</p>
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
};
export default DayPicker;