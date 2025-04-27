import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProfileHeader = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      animate={{ backgroundColor: isTop ? "#f5f9fa" : "#ffffff" }}
      transition={{ duration: 0.3 }}
      className={`rounded-b-3xl flex flex-row justify-between items-center pl-5 pr-5 pt-16 pb-5 z-40 fixed w-full top-0 transition-shadow ${
        isTop ? "" : "shadow-[0_40px_60px_rgba(0,0,0,0.03)]"
      }`}
    >
      <motion.h1
        animate={{ scale: isTop ? 1 : 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-bold text-2xl text-textPrimaryColor origin-left"
      >
        Adrian
      </motion.h1>
    </motion.div>
  );
};

export default ProfileHeader;
