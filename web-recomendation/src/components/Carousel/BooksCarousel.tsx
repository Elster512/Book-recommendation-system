import React from 'react';
import s from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Book } from '../../types/bookcard';
import CarouselItem from './CarouselItem';

import CustomLink from '../Layout/CustomLink';
import { useMediaQuery } from '@mui/material';
import { queryLg, queryMd, querySm } from './queries';

interface IBookCarouselProps {
  books: Book[];
}
const BooksCarousel: React.FC<IBookCarouselProps> = ({ books }) => {
  const sm = useMediaQuery(querySm);
  const md = useMediaQuery(queryMd);
  const lg = useMediaQuery(queryLg);

  const amountOfSwiperSlides = (sm && 2) || (md && 3) || (lg && 4) || 5;
  return (
    <Swiper
      slidesPerView={amountOfSwiperSlides}
      spaceBetween={25}
      pagination={{
        dynamicBullets: true,
        clickable: true,
        el: '.swiper-pagination',
      }}
      modules={[Autoplay, Pagination]}
      slidesPerGroup={amountOfSwiperSlides}
      watchSlidesProgress
      className={s.swiper}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
    >
      {books.map((el) => (
        <SwiperSlide key={el.ISBN}>
          <CustomLink to={el.ISBN}>
            <CarouselItem item={el} />
          </CustomLink>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default BooksCarousel;
