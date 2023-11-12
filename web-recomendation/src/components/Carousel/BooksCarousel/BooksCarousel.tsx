import React from "react";
import s from "./BooksCarousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Book } from "../../../types/bookcard";
import CarouselItem from "../CarouselItem/CarouselItem";

import CustomLink from "../../UI/CustomLink/CustomLink";
import { IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { queryLg, queryMd, querySm, queryXs } from "./queries";

interface IBookCarouselProps {
  books: Book[];
  onSinglePage: boolean;
}
const BooksCarousel: React.FC<IBookCarouselProps> = ({
  books,
  onSinglePage,
}) => {
  const xs = useMediaQuery(queryXs);
  const sm = useMediaQuery(querySm);
  const md = useMediaQuery(queryMd);
  const lg = useMediaQuery(queryLg);
  const amountOfSwiperSlides =
    (xs && 1) || (sm && 2) || (md && 3) || (lg && 4) || 5;
  return (
    <>
      <Swiper
        slidesPerView={amountOfSwiperSlides}
        spaceBetween={25}
        pagination={{
          dynamicBullets: true,
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerGroup={amountOfSwiperSlides}
        watchSlidesProgress
        className={`${s.swiper}`}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
      >
        {books.map((el) => (
          <SwiperSlide className={s["swiper-slide"]} key={el.ISBN}>
            <CustomLink to={el.ISBN}>
              <CarouselItem item={el} />
            </CustomLink>
          </SwiperSlide>
        ))}
        {!onSinglePage && <div className="swiper-pagination"></div>}
      </Swiper>
      <IconButton
        className={`${s.button} ${s.buttonLeft} arrow-left`}
        sx={{
          display: { xs: "none", lg: (!onSinglePage && "none") || "block" },
        }}
      >
        <ArrowBackIosOutlinedIcon fontSize="large" />
      </IconButton>
      <IconButton
        className={`${s.button} ${s.buttonRight} arrow-right`}
        sx={{
          display: { xs: "none", lg: (!onSinglePage && "none") || "block" },
        }}
      >
        <ArrowForwardIosOutlinedIcon fontSize="large" />
      </IconButton>
    </>
  );
};

export default BooksCarousel;
