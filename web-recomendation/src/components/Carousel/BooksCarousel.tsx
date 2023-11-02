import React from 'react';
import s from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Book } from '../../types/bookcard';
import CarouselItem from './CarouselItem';
import 'swiper/css';
import CustomLink from '../CustomLink';
import { useMediaQuery, useTheme } from '@mui/material';

interface IBookCarouselProps {
  books: Book[];
}
const BooksCarousel: React.FC<IBookCarouselProps> = ({ books }) => {
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));
  const amountOfSwiperSlides =
    (matchesLg && 2) || (matchesMd && 4) || (matchesSm && 3) || 4;
  return (
    <Swiper
      slidesPerView={amountOfSwiperSlides}
      spaceBetween={25}
      modules={[Navigation, Autoplay]}
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
