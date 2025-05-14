import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayPicker from "./DayPicker.tsx";
import { format, addDays, isSameDay, isToday, parseISO } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import { setSelectedDay, setToday } from "../slices/generalSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store.ts";

const generateSlide = (dates, currentDate, index, setIsExpanded) => {
  const dispatch = useDispatch();
  console.log("NEW SLIDE INDEX", index);
  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    hidden: {}
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
  };

  const startDate = format(dates[0], "MMM d");
  const endDate = format(dates[dates.length - 1], "MMM d");
  const intervalLabel = `${startDate} – ${endDate}`;


  return (
    <SwiperSlide key={index} virtualIndex={index}>
      <div className="flex flex-col space-y-2">
        <div className="relative flex items-center justify-center my-3">
          <div className="absolute left-0 right-0 text-center text-sm font-semibold text-textPrimaryColor">
            {intervalLabel}
          </div>

          <div className="absolute right-0 pr-4">
            <button
              className="text-primary font-semibold text-sm"
              onClick={() => {
                dispatch(setToday());
                setIsExpanded(false);
              }}
            >
              Today
            </button>
          </div>
        </div>

        <motion.div
          className="overflow-x-auto flex justify-center gap-4 items-center pb-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {dates.map((date, i) => {
            const isSelected = format(date, "yyyy-MM-dd") === currentDate;
            const weekday = format(date, "EEE");
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center"
                onClick={() => {
                  dispatch(setSelectedDay(format(date, "yyyy-MM-dd")));
                  setIsExpanded(false);
                }}
              >
                <div className="text-xs font-medium text-gray-600">
                  {weekday}
                </div>

                <div
                  className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-full ${
                    isSelected ? "bg-primary text-white" : "bg-gray-200 text-black"
                  }`}
                  style={{ fontFamily: "Lexend Deca" }}
                >
                  {format(date, "d")}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SwiperSlide>
  );
};

const Calendar = ({ currentDate, setIsExpanded }) => {
  const daysPerSlide = 7;
  const slidesInAdvance = 52;
  const [swiperRef, setSwiperRef] = useState(null);

  const generateInitialSlideDates = (initialDate, daysPerSlide) => {
    const prepostDates = Math.floor(daysPerSlide / 2);
    return Array.from({ length: daysPerSlide }, (_, i) =>
      addDays(initialDate, i - prepostDates)
    );
  };

  const generateNextSlideDates = (dates, daysPerSlide) => {
    const lastDate = dates[dates.length - 1];
    return Array.from({ length: daysPerSlide }, (_, i) =>
      addDays(lastDate, i + 1)
    );
  };

  const generatePreviousSlideDates = (dates, daysPerSlide) => {
    const firstDate = dates[0];
    return Array.from({ length: daysPerSlide }, (_, i) =>
      addDays(firstDate, -(daysPerSlide - i))
    );
  };

  const [datesBySlide, setDatesBySlide] = useState<Date[][]>([]);

  const generateSlidesInAdvance = (initialDates, daysPerSlide, numberOfSlides) => {
    const slides = [];
    let currentDates = initialDates;

    slides.push(currentDates);

    for (let i = 1; i <= Math.floor(numberOfSlides / 2); i++) {
      currentDates = generatePreviousSlideDates(currentDates, daysPerSlide);
      slides.unshift(currentDates);
    }

    currentDates = initialDates;
    for (let i = 1; i <= Math.floor(numberOfSlides / 2); i++) {
      currentDates = generateNextSlideDates(currentDates, daysPerSlide);
      slides.push(currentDates);
    }

    return slides;
  };


  useEffect(() => {
    const initialDates = generateInitialSlideDates(currentDate, daysPerSlide);

    const allSlides = generateSlidesInAdvance(initialDates, daysPerSlide, slidesInAdvance);

    setDatesBySlide(allSlides);
  }, [currentDate]);

  const addNextSlide = () => {
    const lastSlideDates = datesBySlide[datesBySlide.length - 1];
    const nextDates = generateNextSlideDates(lastSlideDates, daysPerSlide);
    setDatesBySlide((prev) => [...prev, nextDates]);
  };

  const addPreviousSlide = () => {
    const firstSlideDates = datesBySlide[0];
    const previousDates = generatePreviousSlideDates(firstSlideDates, daysPerSlide);

    setDatesBySlide((prev) => {
      setTimeout(() => {
        swiperRef.slideTo(swiperRef.activeIndex + 1, 0);
      }, 0);

      return [previousDates, ...prev];
    });

  };

  const handleSlideChange = (swiper) => {
    const firstSlideIndex = 0;
    const lastSlideIndex = datesBySlide.length - 1;

    if (swiper.activeIndex === lastSlideIndex) {
      addNextSlide();
    }

    if (swiper.activeIndex === firstSlideIndex) {
      addPreviousSlide();
    }

  };

  return (
    <>
      {datesBySlide.length > 0 && (
        <Swiper
          modules={[Virtual]}
          onSwiper={setSwiperRef}
          virtual
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={Math.floor(slidesInAdvance) / 2}
          onSlideChange={handleSlideChange}
        >
          {datesBySlide.map((dates, index) =>
            generateSlide(dates, currentDate, index, setIsExpanded)
          )}
        </Swiper>
      )}
    </>
  );
};


const DayHeader = () => {
  const selectedDay = useSelector((state: IRootState) => state.general.selectedDay);

  const [isTop, setIsTop] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsTop(window.scrollY === 0);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <>
      <motion.div
        animate={{ backgroundColor: isTop ? "#f5f9fa" : "#ffffff" }}
        transition={{ duration: 0.3 }}
        className={`rounded-b-3xl flex flex-col z-40 fixed w-full top-0 transition-shadow ${
          isTop ? "" : "shadow-[0_40px_60px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div
          className="flex flex-row justify-between items-center pl-5 pr-5 pt-16 pb-5 cursor-pointer"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={isTop ? selectedDay : "stats"}
              variants={headerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-bold text-2xl text-textPrimaryColor"
            >
              {isTop ? (
                isToday(parseISO(selectedDay))
                  ? "Today"
                  : format(parseISO(selectedDay), "d MMMM")
              ) : (
                <p>
                  2723{" "}
                  <span className="text-textSecondaryColor text-sm font-[600]">/ 3623</span>
                </p>
              )}
            </motion.h1>
          </AnimatePresence>

          <DayPicker />
        </div>

        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.1 }, layout: { duration: 0.1, ease: "easeInOut" } }}
            className="overflow-hidden px-1 pb-1"
          >
            <Calendar currentDate={selectedDay} setIsExpanded={setIsExpanded} />
          </motion.div>
        )}


      </motion.div>
    </>
  );
};

export default DayHeader;
