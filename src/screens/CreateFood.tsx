import { Divider, Input } from "@nextui-org/react";
import Header from "../components/Header.tsx";

const CreateFood = () => {
  return (
    <>
      <Header title="Create Food" onAccept={() => console.log("Accept")} />
      <div className="flex flex-col m-4 mt-5 gap-5">
        <Input size="lg" label="Brand Name" placeholder="ex. Alfredo" />
        <Input size="lg" label="Description" placeholder="ex. Chicken Breast" />
        <Input size="lg" label="Serving Size" placeholder="ex. 1 cup / 30g" />
        <Input size="lg" label="Servings per container" placeholder="1" />
        <Divider />
        <Input size="lg" label="Calories" />
        <Input size="lg" label="Total fat (g)" />
        <Input size="lg" label="Saturated fat (g)" />
        <Input size="lg" label="Total Carbohydrates (g)" />
        <Input size="lg" label="Sugars (g)" />
        <Input size="lg" label="Protein (g)" />
        <Input size="lg" label="Sodium (g)" />
        <Input size="lg" label="Fiber (g)" />
      </div>
    </>
  );
};

export default CreateFood;