import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayPicker from "./DayPicker.tsx";

// Be sure to install Framer Motion via: npm install framer-motion

const DayHeader = () => {
  // isTop is true when the user is at the top of the page.
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Update isTop based on the scroll position
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Animation variants for the header text.
   * The custom prop determines the animation direction:
   * - When scrolling down (isTop is false, custom = 1):
   *    "Today" exits upward and "Tomorrow" enters from below.
   * - When scrolling up (isTop is true, custom = -1):
   *    "Tomorrow" exits downward and "Today" enters from above.
   */
  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };


  return (
    <motion.div
      // Animate the background color: white at the top, and a light gray when scrolled away.
      animate={{ backgroundColor: isTop ? "#fcfcfc" : "#ffffaa" }}
      transition={{ duration: 0.3 }}
      className="day-header flex flex-row justify-between items-center pl-5 pr-5 pt-16 pb-5 z-50 fixed w-full top-0"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={isTop ? "Today" : "Tomorrow"}
          // Use custom prop to dictate the direction:
          // - When isTop is false (scrolled down), custom = 1.
          // - When isTop is true (at the top), custom = -1.
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
