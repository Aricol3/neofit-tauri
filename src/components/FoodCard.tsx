import { motion } from "framer-motion-legacy";
import { SwipeActions } from "./SwipeActions/SwipeActions.tsx";
import { useNavigate } from "react-router-dom";

interface SwiperProps {
  id?: number;
  title: string;
  subtitle: string;
  calories: number;
  onDelete?: () => void;
}

const FoodCard = ({ title, subtitle, calories, onDelete }: SwiperProps) => {
  const navigate = useNavigate();

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
                        bg-white
                        rounded-lg
                        shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <div className="flex flex-row w-full items-center justify-between gap-3 mb-1 h-12" onClick={()=>navigate("/edit-food")}>
            <div className="text-sm">
              <p className="font-normal">{title}</p>
              <p className="font-light">{subtitle}</p>
            </div>
            <div className="text-sm">
              {calories}
            </div>
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

export default FoodCard;