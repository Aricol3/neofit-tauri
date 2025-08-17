import { Card, CardBody, CardHeader, Input } from "@heroui/react";

const FoodForm = ({ handleInputChange }) => (
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
          label="Brand Name"
          name="brand_name"
          placeholder="ex. Hochland"
          onChange={handleInputChange}
        />
        <Input
          isRequired
          size="lg"
          label="Description"
          name="description"
          placeholder="ex. Cottage Cheese"
          onChange={handleInputChange}
        />
        <Input
          isRequired
          size="lg"
          label="Serving Size"
          name="serving_size"
          placeholder="ex. 100g"
          onChange={handleInputChange}
        />
        <Input
          isRequired
          inputMode="decimal"
          size="lg"
          label="Servings per container"
          name="servings_per_container"
          placeholder="1"
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
          isRequired
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
          label="Polyunsaturated fat (g)"
          name="polyunsaturated_fat"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Monounsaturated fat (g)"
          name="monounsaturated_fat"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Trans fat (g)"
          name="trans_fat"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Cholesterol (mg)"
          name="cholesterol"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Sodium (mg)"
          name="sodium"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Potassium (mg)"
          name="potassium"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Total Carbohydrates (g)"
          name="total_carbohydrates"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Fiber (g)"
          name="fiber"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Sugar (g)"
          name="sugar"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Added Sugars (g)"
          name="added_sugars"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Sugar Alcohols (g)"
          name="sugar_alcohols"
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
          label="Vitamin A (IU)"
          name="vitamin_a"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Vitamin C (mg)"
          name="vitamin_c"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Vitamin D (IU)"
          name="vitamin_d"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Calcium (mg)"
          name="calcium"
          onChange={handleInputChange}
        />
        <Input
          inputMode="decimal"
          size="lg"
          label="Iron (mg)"
          name="iron"
          onChange={handleInputChange}
        />
      </CardBody>
    </Card>
  </>
);

export default FoodForm;
