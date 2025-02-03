import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayPicker from "./DayPicker.tsx";

const DayHeader = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };


  return (
    <motion.div
      animate={{ backgroundColor: isTop ? "#fcfcfc" : "#ffffaa" }}
      transition={{ duration: 0.3 }}
      className="day-header flex flex-row justify-between items-center pl-5 pr-5 pt-16 pb-5 z-50 fixed w-full top-0"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={isTop ? "Today" : "Tomorrow"}
          custom={isTop ? -1 : 1}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="font-bold text-2xl"
        >
          {isTop ? "Today" : "Tomorrow"}
        </motion.h1>
      </AnimatePresence>
      <DayPicker />
    </motion.div>
  );
};

export default DayHeader;
