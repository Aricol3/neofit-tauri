import homeIcon from "../../assets/home.svg";
import homeIconActive from "../../assets/home-active.svg";
import { NavIconProps } from "../../types.ts";

const HomeIcon = ({ isActive }: NavIconProps) => {
  return (
    <>
      {isActive ?
        <img src={homeIconActive} alt="home active icon" />
        :
        <img src={homeIcon} alt="home icon" />
      }
    </>
  );
};

export default HomeIcon;