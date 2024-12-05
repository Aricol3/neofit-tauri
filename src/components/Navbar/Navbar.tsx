import "./Navbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon.tsx";
import NutritionIcon from "../Icons/NutritionIcon.tsx";
import ScanIcon from "../Icons/ScanIcon.tsx";
import SearchIcon from "../Icons/SearchIcon.tsx";
import ProfileIcon from "../Icons/ProfileIcon.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/");

  const handleNavigation = (path:string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="navbar">
      <div
        className={`nav-item ${activeTab === "/" ? "active" : ""}`}
        onClick={() => handleNavigation("/")}
      >
        <HomeIcon isActive={activeTab === "/"} />
        <p>Home</p>
      </div>
      <div
        className={`nav-item ${activeTab === "/nutrition" ? "active" : ""}`}
        onClick={() => handleNavigation("/nutrition")}
      >
        <NutritionIcon isActive={activeTab === "/nutrition"} />
        <p>Nutrition</p>
      </div>
      <div className="nav-item scan-button" onClick={() => handleNavigation("/scan")}>
        <ScanIcon />
      </div>
      <div
        className={`nav-item ${activeTab === "/search" ? "active" : ""}`}
        onClick={() => handleNavigation("/search")}
      >
        <SearchIcon isActive={activeTab === "/search"} />
        <p>Search</p>
      </div>
      <div
        className={`nav-item ${activeTab === "/profile" ? "active" : ""}`}
        onClick={() => handleNavigation("/profile")}
      >
        <ProfileIcon isActive={activeTab === "/profile"} />
        <p>Profile</p>
      </div>
    </div>
  );
};

export default Navbar;
