import { Card, CardBody, CardHeader } from "@nextui-org/react";

const FoodCard = () => {
  return (
    <>
      <Card>
        <CardHeader>
          Oats
        </CardHeader>
      <CardBody>
        15g protein
        20g carbs
        10g fat
      </CardBody>
      </Card>
    </>
  );
}

export default FoodCard;