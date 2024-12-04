import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const FoodCard = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/edit-food")}>
      <Card>
        <CardHeader>
          Oats
        </CardHeader>
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