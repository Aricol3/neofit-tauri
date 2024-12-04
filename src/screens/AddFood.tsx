import { Divider, Input } from "@nextui-org/react";

const AddFood = () => {
  return (
    <div className="p-5">
      <h1>Add Food</h1>
      <h1 className="text-2xl">Sprite</h1>
      <Divider />
      <div className="flex flex-col gap-3 mt-5">
        <Input label="Serving Size" />
        <Input label="Number of servings" />
        <Input label="Meal" />
      </div>
    </div>
  );
};

export default AddFood;