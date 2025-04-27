import ProfileHeader from "../components/ProfileHeader.tsx";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import QuoteCard from "../components/QuoteCard.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons/faScaleBalanced";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import StickyCardMenu from "../components/StickyCardMenu.tsx";
import userProfile from "../assets/user-profile.svg";
import lemon from "../assets/lemon.svg";
import sliders from "../assets/sliders.svg";
import question from "../assets/question.svg";

const Profile = () => {
  const personalItems = ["Personal details", "My items"];
  const dietItems = ["Goals", "Nutrition", "Water", "Activity", "Weight", "Diary"];
  const generalItems = ["Notifications", "Units"];
  const helpItems = ["Subscription info", "Restore purchases", "Privacy Settings"];


  return (
    <>
      <ProfileHeader />

      <div className="flex flex-col p-3 pt-1.5 gap-3">
        <QuoteCard />

        <div className="flex flex-row">
          <div className="flex flex-row gap-3">
            <Card className="h-24 w-44 shadow-sm" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardHeader className="flex justify-between text-textPrimaryColor">
                <div className="text-sm text-textSecondaryColor font-[600] flex items-center gap-3">
                  Current weight
                </div>
              </CardHeader>
              <CardBody className="overflow-visible pt-0 flex flex-row justify-between items-center">
                <div className="text-2xl text-textPrimaryColor font-[600]" style={{ fontFamily: "Lexend Deca" }}>
                  85
                  <span className="text-sm text-textPrimaryColor font-[600] ml-1">
                    kg
                  </span>
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faAdd} />
              </CardBody>
            </Card>
            <Card className="h-24 w-44 shadow-sm" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardHeader className="flex justify-between text-textPrimaryColor">
                <div className="text-sm text-textSecondaryColor font-[600] flex items-center gap-3">
                  Goal weight
                </div>
              </CardHeader>
              <CardBody className="overflow-visible pt-0 flex flex-row justify-between items-center">
                <div className="text-2xl text-textPrimaryColor font-[600]" style={{ fontFamily: "Lexend Deca" }}>
                  95
                  <span className="text-sm text-textPrimaryColor font-[600] ml-1">
                    kg
                  </span>
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faPen} />
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-row gap-3">
            <Card className="h-26 w-44 shadow-sm" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible pt-0 flex flex-row justify-between items-center">
                <div className="text-lg text-textPrimaryColor font-[600]" style={{ fontFamily: "Lexend Deca" }}>
                  Activity <br /> Progress
                </div>
                <FontAwesomeIcon size="lg" className="text-textPrimaryColor" icon={faDumbbell} />
              </CardBody>
            </Card>

            <Card className="h-24 w-44 shadow-sm" isPressable shadow="none" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible pt-0 flex flex-row justify-between items-center">
                <div className="text-lg text-textPrimaryColor font-[600]" style={{ fontFamily: "Lexend Deca" }}>
                  Diet <br /> Overview
                </div>
                <FontAwesomeIcon size="lg" className="text-textPrimaryColor" icon={faScaleBalanced} />
              </CardBody>
            </Card>
          </div>
        </div>

        <StickyCardMenu
          title="Personal"
          icon={userProfile}
          items={personalItems}
        />

        <StickyCardMenu
          title="Diet"
          icon={lemon}
          items={dietItems}
        />

        <StickyCardMenu
          title="General"
          icon={sliders}
          items={generalItems}
        />

        <StickyCardMenu
          title="Help"
          icon={question}
          items={helpItems}
        />


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