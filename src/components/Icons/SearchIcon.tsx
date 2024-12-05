import searchIcon from "../../assets/search.svg";
import searchIconActive from "../../assets/search-active.svg";
import { NavIconProps } from "../../types.ts";

const SearchIcon = ({ isActive }: NavIconProps) => {
  return (
    <>
      {isActive ?
        <img src={searchIconActive} alt="search active icon" />
        :
        <img src={searchIcon} alt="search icon" />
      }
    </>
  );
};

export default SearchIcon;