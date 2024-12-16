import { motion } from "framer-motion-legacy";
import { SwipeActions } from "./SwipeActions/SwipeActions.tsx";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Button, Chip } from "@nextui-org/react";
import AddButton from "./AddButton.tsx";

interface SwiperProps {
  id?: number;
  title: string;
  subtitle: string;
  onDelete?: () => void;
}

const HistoryCard = ({ title, subtitle, onDelete }: SwiperProps) => {
  const navigate = useNavigate();

  const onAdd = () => {
    console.log("onAdd");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1, height: "auto" }}
      // initial={{ opacity: 0, height: 0 }}
      // animate={{ opacity: 1, height: "auto" }}
      exit={{
        opacity: 0,
        height: 0,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
      transition={{
        layout: { duration: 0.3 },
        initial: { duration: 0.3 },
        animate: { duration: 0.3 }
      }}
    >
      <SwipeActions.Root className="w-auto text-base will-change-transform">
        <SwipeActions.Trigger
          className="
                        p-3
                        bg-gray-50
                        rounded-lg
                        shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <div className="flex flex-row w-full items-center justify-between gap-1 mb-1 h-12">
            <div className="text-sm w-full" onClick={() => navigate("/edit-food")}>
              <p className="font-normal">{title}</p>
              <p className="font-light">{subtitle}</p>
            </div>
            <AddButton onAdd={onAdd} />
          </div>
        </SwipeActions.Trigger>
        <SwipeActions.Actions
          wrapperClassName="rounded-lg bg-[#ff3333]"
        >
          <SwipeActions.Action
            className="
                            h-full
                            aspect-square
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-2
                            text-white
                            text-xs
                            cursor-pointer
                            select-none"
            onClick={onDelete}
          >
            <div>Delete</div>
          </SwipeActions.Action>
        </SwipeActions.Actions>
      </SwipeActions.Root>
    </motion.div>
  );
};

export default HistoryCard;