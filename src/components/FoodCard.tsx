import { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ onDelete }) => {
  const navigate = useNavigate();
  const [isSwiped, setIsSwiped] = useState(false);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = -50;
    if (info.offset.x < swipeThreshold) {
      setIsSwiped(true);
    } else {
      setIsSwiped(false);
    }
  };

  return (
    <div style={{ position: "relative" }} onClick={()=>navigate("/edit-food")}>
      <motion.div
        drag="x"
        dragConstraints={{ left: isSwiped ? -50 : 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ x: 0 }}
        animate={{ x: isSwiped ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{
          zIndex: 1,
          position: "relative",
          background: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Card style={{backgroundColor:"#faf9f6"}}>
          <CardBody className="flex flex-row items-center text-sm justify-between">
            <div className="text-sm">
              <p className="font-normal">Chicken Strips American Style With Curry</p>
              <p className="font-light">Culinea, 500 gram</p>
            </div>
            <div className="text-sm">
              900
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {isSwiped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "100px",
            backgroundColor: "#ff3e4e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          <Button
            auto
            color="error"
            onClick={onDelete}
            style={{ background: "transparent", border: "none", color: "white" }}
          >
            Delete
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FoodCard;
