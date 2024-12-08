import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ onDelete }) => {
  const navigate = useNavigate();

  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(false);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const diffX = touchX - startX;

    setCurrentX(diffX);

    if (Math.abs(diffX) > 20) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping && currentX < -50) {
      if (onDelete) onDelete();
    }

    setStartX(0);
    setCurrentX(0);
    setIsSwiping(false);
  };

  const translateX = isSwiping ? currentX : 0;

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isSwiping ? "none" : "transform 0.3s ease",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={()=>navigate("/edit-food")}
    >
      <Card>
        <CardHeader>Oats</CardHeader>
        <CardBody>
          15g protein
          20g carbs
          10g fat
        </CardBody>
      </Card>
    </div>
  );
};

export default FoodCard;
