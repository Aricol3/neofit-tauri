import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Header from "../components/Header.tsx";
import useFoodForm from "../hooks/useFoodForm.tsx";
import FoodForm from "../components/FoodForm.tsx";

const CreateFood = () => {
  const { formData, handleInputChange, handleSubmit } = useFoodForm();

  return (
    <>
      <Header title="Create Food" onAccept={handleSubmit} />
      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <FoodForm formData={formData} handleInputChange={handleInputChange} />
      </div>
    </>
  );
};

export default CreateFood;
