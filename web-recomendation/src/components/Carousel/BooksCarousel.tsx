import React from 'react';
import s from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Book } from '../../types/bookcard';
import CarouselItem from './CarouselItem';
import 'swiper/css';
import 'swiper/css/pagination';
import CustomLink from '../CustomLink';
import { useMediaQuery, useTheme } from '@mui/material';

interface IBookCarouselProps {
  books: Book[];
}
const BooksCarousel: React.FC<IBookCarouselProps> = ({ books }) => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const amountOfSwiperSlides =
    (downSm && 2) || (downMd && 3) || (downLg && 4) || 5;
  return (
    <Swiper
      slidesPerView={amountOfSwiperSlides}
      spaceBetween={25}
      modules={[Navigation, Autoplay, Pagination]}
      slidesPerGroup={amountOfSwiperSlides}
      watchSlidesProgress
      className={s.swiper}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
    >
      {books.map((el) => (
        <SwiperSlide key={el.ISBN}>
          <CustomLink to={el.ISBN}>
            <CarouselItem item={el} />
          </CustomLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BooksCarousel;
