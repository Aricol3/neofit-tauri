import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput.tsx";
import { Tab, Tabs } from "@heroui/react";

const SearchHeader = () => {
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
      initial={{ backgroundColor: "#f5f9fa" }}
      animate={{ backgroundColor: isTop ? "#f5f9fa" : "#ffffff" }}
      transition={{ duration: 0.3 }}
      className={`rounded-b-3xl rounded flex flex-col items-center justify-between gap-3 pl-5 pr-5 pt-14 pb-5 z-40 fixed w-full top-0 transition-shadow ${
        isTop ? "" : "shadow-[0_40px_60px_rgba(0,0,0,0.03)]"
      }`}>

      <h1 className="font-bold text-xl text-primary w-full text-center">Select a Meal</h1>

      <SearchInput/>

      <Tabs variant="underlined" color="primary">
        <Tab key="recent" title="Recent" />
        <Tab key="food" title="Food" />
        <Tab key="meals" title="Meals" />
        <Tab key="recipes" title="Recipes" />
      </Tabs>

    </motion.div>
  )
    ;
};

export default SearchHeader;