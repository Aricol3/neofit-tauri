import { Divider, Input } from "@heroui/react";

const EditFood = () => {
  return (
    <div className="p-5">
      <h1>Edit Food</h1>
      <h1 className="text-2xl">Oats</h1>
      <Divider/>
      <div className="flex flex-col gap-3 mt-5">
          <Input label="Serving Size" value="15g protein"/>
          <Input label="Number of servings" value="20g carbs"/>
          <Input label="Meal" value="10g fat"/>
      </div>
    </div>
  )
}

export default EditFood;