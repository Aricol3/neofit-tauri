import profileIcon from "../../assets/profile.svg";
import profileIconActive from "../../assets/profile-active.svg";
import { NavIconProps } from "../../types.ts";

const ProfileIcon = ({ isActive }: NavIconProps) => {
  return (
    <>
      {isActive ?
        <img src={profileIconActive} alt="profile active icon" />
        :
        <img src={profileIcon} alt="profile icon" />
      }
    </>
  );
};

export default ProfileIcon;