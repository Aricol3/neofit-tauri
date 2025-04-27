import ProfileHeader from "../components/ProfileHeader.tsx";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import NewMacroProgress from "../components/NewMacroProgress.tsx";
import { MACRO } from "../types.ts";
import QuoteCard from "../components/QuoteCard.tsx";

const Profile = () => {

  return (
    <>
      <ProfileHeader />

      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <QuoteCard/>


        <div className="flex flex-row gap-3 mt-44">
          <div className="flex flex-1">
            <Card className="w-44" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>da</b>
                <p className="text-default-500">10</p>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col gap-3">
            <Card className="h-24 w-44" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>da</b>
                <p className="text-default-500">10</p>
              </CardFooter>
            </Card>
            <Card className="h-24 w-44" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>da</b>
                <p className="text-default-500">10</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;