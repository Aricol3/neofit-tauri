import "./Navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon.tsx";
import NutritionIcon from "../Icons/NutritionIcon.tsx";
import ScanIcon from "../Icons/ScanIcon.tsx";
import SearchIcon from "../Icons/SearchIcon.tsx";
import ProfileIcon from "../Icons/ProfileIcon.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (base: string) => {
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  const handleNavigation = (path: string) => navigate(path);

  return (
    <div className="navbar">
      <div
        className={`nav-item ${isActive("/") ? "active" : ""}`}
        onClick={() => handleNavigation("/")}
      >
        <HomeIcon isActive={isActive("/")} />
        <p>Home</p>
      </div>

      <div
        className={`nav-item ${isActive("/nutrition") ? "active" : ""}`}
        onClick={() => handleNavigation("/nutrition")}
      >
        <NutritionIcon isActive={isActive("/nutrition")} />
        <p>Nutrition</p>
      </div>

      <div className="nav-item scan-button" onClick={() => handleNavigation("/scan")}>
        <ScanIcon />
      </div>

      <div
        className={`nav-item ${isActive("/search") ? "active" : ""}`}
        onClick={() => handleNavigation("/search")}
      >
        <SearchIcon isActive={isActive("/search")} />
        <p>Search</p>
      </div>

      <div
        className={`nav-item ${isActive("/profile") ? "active" : ""}`}
        onClick={() => handleNavigation("/profile")}
      >
        <ProfileIcon isActive={isActive("/profile")} />
        <p>Profile</p>
      </div>
    </div>
  );
};

export default Navbar;
