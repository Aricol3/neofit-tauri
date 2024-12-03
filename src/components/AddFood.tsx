import { Divider, Input } from "@nextui-org/react";

const AddFood = () => {
  return (
    <>
      <h1>Sprite</h1>
      <Divider/>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p>Serving Size</p>
          <Input />
        </div>
        <div className="flex flex-row justify-between">
          <p>Number of servings</p>
          <Input />
        </div>
        <div className="flex flex-row justify-between">
          <p>Meal</p>
          <Input />
        </div>
      </div>
    </>
  )
}

export default AddFood;