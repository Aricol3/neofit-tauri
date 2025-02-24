import { Card, CardHeader, CardBody } from "@heroui/react";
import Header from "../components/Header.tsx";
import useFoodForm from "../hooks/useFoodForm.tsx";
import FoodForm from "../components/FoodForm.tsx";

const CreateFood = () => {
  const { handleInputChange, handleSubmit } = useFoodForm();

  return (
    <>
      <Header title="Create Food" onAccept={handleSubmit} />
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <FoodForm handleInputChange={handleInputChange} />
      </div>
    </>
  );
};

export default CreateFood;
