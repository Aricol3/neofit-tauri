import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }} onClick={()=>navigate("/edit-food")}>
        <Card style={{backgroundColor:"#faf9f6"}}>
          <CardBody className="flex flex-row  text-sm justify-between">
            <div className="text-sm">
              <p className="font-normal">Chicken Strips American Style With Curry</p>
              <p className="font-light">Culinea, 500 gram</p>
            </div>
            <div className="text-sm">
              900
            </div>
          </CardBody>
        </Card>
    </div>
  );
};

export default FoodCard;
