import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Button } from "@nextui-org/react";

interface HeaderProps {
  title: string;
  backRoute?: string;
  onAccept?: () => void;
}

const Header = ({ title, backRoute, onAccept }: HeaderProps) => {
  return (
    <div className="header flex flex-row justify-between items-center pl-5 pr-5 pt-12 pb-1 z-50 fixed w-full top-0">
      <Button className="bg-transparent" isIconOnly onClick={(event) => {
        event.currentTarget.blur();

      }}>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </Button>
      <p>{title}</p>
      <Button className="bg-transparent" isIconOnly onClick={(event) => {
        event.currentTarget.blur();
        onAccept?.();
      }}>
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </Button>
    </div>
  );
};

export default Header;