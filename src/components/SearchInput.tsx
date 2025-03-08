import { Input } from "@heroui/react";
import { SearchBarIcon } from "../screens/Search.tsx";

const SearchInput = () => {

  return (
    <div className="flex flex-col">
      <Input isClearable size="lg" placeholder="Search for a food"
             classNames={{
               inputWrapper: [
                 "hover:bg-default-200/70 bg-gray-50"
               ]
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