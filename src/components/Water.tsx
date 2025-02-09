import "swiper/scss";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import WaterCup from "./WaterCup.tsx";

const Water = () => {
  const totalCups = 12;
  const filledCups = 3;

  return (
    <Card className="w-full h-[150px] border-none bg-waterBackground" shadow="none">
      <CardHeader className="pb-0 flex flex-row justify-between">
        <p className="text-white text-lg font-[600]">Water</p>
        <p className="text-white text-sm font-[600]">0,75 / 3,5 l</p>
      </CardHeader>
      <CardBody className="flex flex-row pt-5 pb-1">
        <Swiper
          spaceBetween={0}
          slidesPerView={8}
          slidesPerGroup={8}
          pagination={true}
          modules={[Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {Array.from({ length: totalCups }).map((_, index) => (
            <SwiperSlide key={index}>
              <WaterCup
                isFilled={index < filledCups}
                isNextToFill={index === filledCups}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CardBody>
    </Card>
  );
};

export default Water;