import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { Input } from "@heroui/react";
import HistorySection from "../components/HistorySection.tsx";
import SearchHeader from "../components/SearchHeader.tsx";

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
      <SearchHeader/>

      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <HistorySection/>
      </div>
    </>
  );
};

export default Search;