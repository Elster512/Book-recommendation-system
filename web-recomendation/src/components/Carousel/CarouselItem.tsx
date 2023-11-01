import React from 'react';
import { Book } from '../../types/bookcard';
import { Card, CardContent, CardMedia } from '@mui/material';

interface ICarouselItem {
  item: Book;
}
const CarouselItem: React.FC<ICarouselItem> = ({ item }) => {
  return (
    <Card sx={{ minHeight: 'inherit', width: '220px', height: 'inherit' }}>
      <CardMedia
        component="img"
        image={item.imageUrlL}
        sx={{ objectFit: 'cover', width: '100%', height: '340px' }}
      />
      <CardContent></CardContent>
    </Card>
  );
};

export default CarouselItem;
