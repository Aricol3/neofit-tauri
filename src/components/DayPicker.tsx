import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";

const DayPicker = () => {
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);
  const parsedDate = format(parseISO(selectedDay), "d MMM")

  return (
    <div className="flex gap-3 text-textSecondaryColor">
      <FontAwesomeIcon icon={faAngleLeft} />
      <FontAwesomeIcon icon={faCalendar} />
      <p className="-mt-0.5 font-[600]">{parsedDate}</p>
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
};
export default DayPicker;