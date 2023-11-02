import React from 'react';
import s from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Book } from '../../types/bookcard';
import CarouselItem from './CarouselItem';
import 'swiper/css';
import CustomLink from '../CustomLink';

interface IBookCarouselProps {
  books: Book[];
}
const BooksCarousel: React.FC<IBookCarouselProps> = ({ books }) => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={25}
      modules={[Navigation, Autoplay]}
      slidesPerGroup={5}
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
