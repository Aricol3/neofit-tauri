import { Card, CardBody, CardHeader, Input } from "@heroui/react";

// SERVING SIZE VALUE | UNIT

const FoodForm = ({handleInputChange }) => (
  <>
    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader>
        <div className="text-textPrimaryColor text-lg font-[600]">
          General Information
        </div>
      </CardHeader>
      <CardBody className="w-full py-0 px-3 pb-3.5 overflow-hidden text-textPrimaryColor flex gap-3"
                style={{ fontFamily: "Lexend Deca" }}>
        <Input
          size="lg"
          label={
            <div className="flex flex-row items-center gap-1">Brand Name <p className="text-sm">(optional)</p></div>
          }
          name="brand_name"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Description"
          name="description"
          onChange={handleInputChange}
        />
        <Input
          size="lg"
          label="Serving Size"
          name="serving_size"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Servings per container"
          name="servings_per_container"
          onChange={handleInputChange}
        />
      </CardBody>
    </Card>

    <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
      <CardHeader>
        <div className="text-textPrimaryColor text-lg font-[600]">
          Nutritional Information
        </div>
      </CardHeader>
      <CardBody className="w-full py-0 px-3 pb-3.5 overflow-hidden text-textPrimaryColor flex gap-3"
                style={{ fontFamily: "Lexend Deca" }}>
        <Input
          inputMode="decimal"
          size="lg"
          label="Calories"
          name="calories"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Total fat (g)"
          name="total_fat"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Saturated fat (g)"
          name="saturated_fat"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Total carbohydrates (g)"
          name="total_carbs"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Sugars (g)"
          name="sugars"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Protein (g)"
          name="protein"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Sodium (g)"
          name="sodium"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Fiber (g)"
          name="fiber"
          onChange={handleInputChange}
        />
      </CardBody>
    </Card>
  </>
);

export default FoodForm;
