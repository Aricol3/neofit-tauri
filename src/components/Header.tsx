import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  backRoute?: string;
  onBack?: () => void;
  onAccept?: () => void;
}

const Header = ({ title, backRoute, onBack, onAccept }: HeaderProps) => {
  const [isTop, setIsTop] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }

    if (backRoute) {
      navigate(backRoute);
    } else {
      navigate(-1);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.div
      initial={{ backgroundColor: "#f5f9fa" }}
      animate={{ backgroundColor: isTop ? "#f5f9fa" : "#ffffff" }}
      transition={{ duration: 0.3 }}
      className={`rounded-b-3xl rounded flex items-center justify-between pl-5 pr-5 pt-14 pb-5 z-40 fixed w-full top-0 transition-shadow ${
        isTop ? "" : "shadow-[0_40px_60px_rgba(0,0,0,0.03)]"
      }`}>
      <Button className="bg-transparent" isIconOnly onPress={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </Button>

      <h1 className="font-bold text-xl text-textPrimaryColor">{title}</h1>

      {onAccept ? (
        <Button className="bg-transparent" isIconOnly onPress={onAccept}>
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </Button>
      ) : (
        <Button className="bg-transparent invisible" isIconOnly disabled>
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </Button>
      )}
    </motion.div>
  )
    ;
};

export default Header;