import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { motion, AnimatePresence } from "framer-motion";

interface AddButtonProps {
  onAdd: () => void;
}

const AddButton = ({ onAdd }: AddButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    setIsClicked(true);
    setIsAnimating(true);
    onAdd();

    setTimeout(() => {
      setIsClicked(false);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <motion.div
      animate={{
        backgroundColor: isClicked ? "#9e86ff" : "#f5f5f5",
      }}
      className="rounded-full p-2 flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isClicked ? "check" : "plus"}
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.1 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesomeIcon
            color={isClicked ? "#ffffff" : "#9e86ff"}
            size="lg"
            icon={isClicked ? faCheck : faPlus}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default AddButton;
