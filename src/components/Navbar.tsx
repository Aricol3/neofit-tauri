import {
  Button,
  Link,
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem, NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { checkPermissions, Format, requestPermissions, scan } from "@tauri-apps/plugin-barcode-scanner";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState("");

  const scanBarcode = async () => {
    navigate("/scan");
    // setScanResult("inainte")
    // let permission = await checkPermissions();
    //
    // if (permission === "prompt") {
    //   permission = await requestPermissions();
    // }
    // if (permission !== "granted") {
    //   setScanResult("Camera permission denied");
    //   return;
    // }
    //
    // try {
    //   const result = await scan({
    //     windowed: true,
    //     formats: [Format.EAN8, Format.EAN13],
    //   });
    //   setScanResult(`Scanned result: ${result.content}`);
    //   console.log("Barcode scanned:", result.content);
    // } catch (error) {
    //   console.error("Failed to scan barcode:", error);
    //   setScanResult("Failed to scan barcode");
    // }
  }

  console.log("merge?");

  return (
    <div className="bottom-0 fixed bg-purple-500">
      <NextNavbar className="pb-4" position="sticky">
        <NavbarBrand>
          <p className="font-bold text-inherit">NeoFit</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Button isIconOnly color="default" aria-label="Like" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHome} />
            </Button>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#/nutrition" aria-current="page">
              Nutrition
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#/scan">
              Profile
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" href="#" variant="flat" onClick={scanBarcode}>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NextNavbar>
    </div>
  );
};

export default Navbar;