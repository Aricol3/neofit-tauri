import { Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import Header from "../components/Header.tsx";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons/faBurger";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons/faWineGlass";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons/faCookieBite";

const AddFood = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      <Header title="Add Food" onAccept={() => console.log("Accept")} />
      <div className="flex flex-col m-4 gap-5">
        <div>
          <h1 className="text-xl font-bold">Sprite</h1>
          <p>Coca Cola</p>
        </div>
        <Divider />
        <Input size="lg" label="Serving Size" placeholder="100g" />
        <Input size="lg" label="Number of servings" placeholder="1" />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div>
              <Input className="select-none" size="lg" label="Meal" value={selectedValue} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="Breakfast">
              <div className="flex flex-row text-center items-center gap-2">
                <FontAwesomeIcon color="#50545A" icon={faMugHot} />
                <p className="text-lg">Breakfast</p>
              </div>
            </DropdownItem>
            <DropdownItem key="Lunch">
              <div className="flex flex-row text-center items-center gap-2">
                <FontAwesomeIcon color="#50545A" icon={faBurger} />
                <p className="text-lg">Lunch</p></div>
            </DropdownItem>
            <DropdownItem key="Dinner">
              <div className="flex flex-row text-center items-center gap-2">
                <FontAwesomeIcon color="#50545A" icon={faWineGlass} />
                <p className="text-lg">Dinner</p>
              </div>
            </DropdownItem>
            <DropdownItem key="Snack">
              <div className="flex flex-row text-center items-center gap-2">
                <FontAwesomeIcon color="#50545A" icon={faCookieBite} />
                <p className="text-lg">Snack</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default AddFood;