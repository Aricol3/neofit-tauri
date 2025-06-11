import { Input } from "@heroui/react";
import { JSX } from "react/jsx-runtime";
import { SVGProps, useEffect, useState } from "react";

const SearchBarIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
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

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      onSearch(searchTerm.trim());
    }, 300); // 300ms debounce

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <Input
        isClearable
        size="lg"
        placeholder="Search for a food"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        classNames={{
          inputWrapper: ["hover:bg-default-200/70 bg-gray-50"],
        }}
        startContent={
          <SearchBarIcon className="text-primary mb-0.5 pointer-events-none flex-shrink-0" />
        }
        radius="full"
      />
    </div>
  );
};

export default SearchInput;