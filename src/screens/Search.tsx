import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import Header from "../components/Header.tsx";
import { Input } from "@heroui/react";
import { AnimatePresence } from "framer-motion-legacy";
import HistoryCard from "../components/HistoryCard.tsx";
import HistorySection from "../components/HistorySection.tsx";

export const SearchBarIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const Search = () => {
  const onDelete = (idToDelete: number) => {
    setSwipers(currentSwipers =>
      currentSwipers.filter(swiper => swiper.id !== idToDelete)
    );
  };

  return (
    <>
      <Header title={"Search"} />

      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <div className="p-5 flex flex-col gap-5">
          <Input isClearable size="lg" placeholder="Search for a food"
                 classNames={{
                   inputWrapper: [
                     "hover:bg-default-200/70 bg-white"
                   ]
                 }}
                 startContent={
                   <SearchBarIcon className="text-primary mb-0.5 pointer-events-none flex-shrink-0" />
                 }
                 radius="full"
          />
        </div>

        <HistorySection/>
      </div>
    </>
  );
};

export default Search;