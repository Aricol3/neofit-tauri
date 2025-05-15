import "swiper/scss";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Card, CardBody, CardHeader } from "@heroui/react";
import WaterCup from "./WaterCup.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store.ts";
import { selectWaterForDate, setWaterIntake } from "../slices/nutritionSlice.ts";
import { setWaterIntakeWithSelectedDay } from "../slices/thunks.ts";

const Water = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);

  const filledCups = useSelector((state: IRootState) =>
    selectWaterForDate(state, selectedDay)
  );

  const totalCups = 12;
  const cupSize = 0.25;

  const onWaterClick = (index: number) => {
    const newCount = index >= filledCups ? index + 1 : index;
    dispatch(setWaterIntakeWithSelectedDay(newCount));
  };

  return (
    <Card className="w-full h-[150px] border-none bg-waterBackground" shadow="none">
      <CardHeader className="pb-0 flex flex-row justify-between">
        <p className="text-white text-lg font-[600]">Water</p>
        <p className="text-white text-sm font-[600]">{filledCups * cupSize} / {totalCups * cupSize} l</p>
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
                onClick={() => onWaterClick(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CardBody>
    </Card>
  );
};

export default Water;