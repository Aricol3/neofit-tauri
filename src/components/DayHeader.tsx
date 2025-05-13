import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayPicker from "./DayPicker.tsx";

// In case of larger screens this should be calculated dynamically

const NumberList = () => {
  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    hidden: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="flex justify-center gap-4 flex-wrap"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {Array.from({ length: 7 }, (_, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-sm font-medium"
        >
          {i + 1}
        </motion.div>
      ))}
    </motion.div>
  );
};


const DayHeader = () => {
  const [isTop, setIsTop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsTop(window.scrollY === 0);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <>
      <motion.div
        animate={{ backgroundColor: isTop ? "#f5f9fa" : "#ffffff" }}
        transition={{ duration: 0.3 }}
        className={`rounded-b-3xl flex flex-col z-40 fixed w-full top-0 transition-shadow ${
          isTop ? "" : "shadow-[0_40px_60px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div
          className="flex flex-row justify-between items-center pl-5 pr-5 pt-16 pb-5 cursor-pointer"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={isTop ? "Today" : "Tomorrow"}
              variants={headerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-bold text-2xl text-textPrimaryColor"
            >
              {isTop ? (
                "Today"
              ) : (
                <p>
                  2723{" "}
                  <span className="text-textSecondaryColor text-sm font-[600]">
                    / 3623
                  </span>
                </p>
              )}
            </motion.h1>
          </AnimatePresence>
          <DayPicker />
        </div>

        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.1 }, layout: { duration: 0.1, ease: "easeInOut" } }}
            className="overflow-hidden px-5 pb-4"
          >
            <NumberList />
          </motion.div>
        )}



      </motion.div>
    </>
  );
};

export default DayHeader;
