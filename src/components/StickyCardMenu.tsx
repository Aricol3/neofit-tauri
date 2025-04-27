import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type StickyCardMenuProps = {
  title: string;
  icon?: string;
  items: string[];
};


const StickyCardMenu = ({ title, icon, items }: StickyCardMenuProps) => {
  return (
    <div className="mt-0">
      <div className="sticky top-28 z-10">
        <div className="w-full h-7 bg-backgroundColor" />
      </div>

      <div className="bg-white rounded-2xl">
        <div
          className="sticky top-32 bg-white z-20 p-4 overflow-hidden rounded-2xl -mt-2 flex flex-row items-center gap-4 pl-6">
          {icon && <img src={icon} className="h-5" alt={`${title} icon`} />}
          <h2 className="text-textPrimaryColor text-xl font-bold">{title}</h2>
        </div>

        <div className="h-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row justify-between items-center ${
                index === 0 ? "mt-4" : "my-8"
              } ${index === items.length - 1 ? "mb-4" : "mb-8"} mx-6`}
            >
              <div className="text-textSecondaryColor">{item}</div>
              <FontAwesomeIcon
                className="text-textSecondaryColor"
                icon={faChevronRight}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyCardMenu;
