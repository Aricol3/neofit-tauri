import ProfileHeader from "../components/ProfileHeader.tsx";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import QuoteCard from "../components/QuoteCard.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons/faScaleBalanced";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import { faLemon } from "@fortawesome/free-solid-svg-icons/faLemon";
import lemon from "../assets/lemon.svg";
import homeIcon from "../assets/home.svg";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const Profile = () => {

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

        <div className="mt-0">
          <div className="sticky top-28 z-10">
            <div className="w-full h-7 bg-backgroundColor" />
          </div>
          <div className="bg-white rounded-2xl">
            <div className="sticky top-32 bg-white z-20 p-4 overflow-hidden rounded-2xl -mt-2 flex flex-row items-center gap-4 ml-2">
              <img src={lemon} className="h-5" alt="lemon icon" />
              <h2 className="text-textPrimaryColor text-xl font-bold">Diet</h2>
            </div>

            <div className="h-full">

              <div className="flex flex-row justify-between items-center mt-4 mb-8 mx-6">
                <div className="text-textSecondaryColor">
                  Goals
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>

              <div className="flex flex-row justify-between items-center my-8 mx-6">
                <div className="text-textSecondaryColor">
                  Nutrition
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>

              <div className="flex flex-row justify-between items-center my-8 mx-6">
                <div className="text-textSecondaryColor">
                  Water
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>

              <div className="flex flex-row justify-between items-center my-8 mx-6">
                <div className="text-textSecondaryColor">
                  Activity
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>

              <div className="flex flex-row justify-between items-center my-8 mx-6">
                <div className="text-textSecondaryColor">
                  Weight
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>

              <div className="flex flex-row justify-between items-center mt-8 mb-4 mx-6">
                <div className="text-textSecondaryColor">
                  Diary
                </div>
                <FontAwesomeIcon className="text-textSecondaryColor" icon={faChevronRight} />
              </div>
            </div>
          </div>
        </div>


        <div>
          <div className="sticky top-28 z-10">
            <div className="w-full h-5 bg-backgroundColor" />
          </div>
          <div className="bg-white rounded-2xl">
            <div className="sticky top-32 bg-white z-20 p-4 overflow-hidden rounded-2xl -mt-2">
              <h2 className="text-xl font-semibold">Card Title</h2>
            </div>

            <div className="relative h-full p-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
                consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tincidunt.
                Nullam
                nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.
              </p>
              <p>
                Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa
                mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam
                elit agna, end augue eget diam.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 z-10">
            <div className="w-full h-5 bg-backgroundColor" />
          </div>
          <div className="bg-white rounded-2xl">
            <div className="sticky top-32 bg-white z-20 p-4 overflow-hidden rounded-2xl -mt-2">
              <h2 className="text-xl font-semibold">Card Title</h2>
            </div>

            <div className="relative h-full p-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
                massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
                consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tincidunt.
                Nullam
                nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.
              </p>
              <p>
                Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa
                mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam
                elit agna, end augue eget diam.
              </p>
            </div>
          </div>
        </div>


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