import React from 'react';
import { Book } from '../../../types/bookcard';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from '@mui/material';

interface ICarouselItem {
  item: Book;
}
const CarouselItem: React.FC<ICarouselItem> = ({ item }) => {
  return (
    <Card
      sx={{
        minHeight: '340px',
        width: { xs: '210px', sm: '200px', md: '210px' },
        height: 'inherit',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        alt={item.bookTitle}
        image={item.imageUrlL}
        sx={{
          objectFit: 'cover',
          width: '100%',
          height: '340px',
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          opacity: 0,
          width: '100%',
          top: 0,
          height: '100%',
          zIndex: 1,
          p: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'opacity 0.5s ease-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            m: '20px',
            display: 'block',
          }}
        >
          {item.bookTitle}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'white',
            mt: '10px',
            dispalay: 'block',
          }}
        >
          {item.bookAuthor}
        </Typography>
        <Rating
          value={item.bookRating}
          readOnly
          precision={0.5}
          emptyIcon={
            <StarBorderIcon fontSize="inherit" sx={{ color: 'white' }} />
          }
        />
      </CardContent>
    </Card>
  );
};

export default CarouselItem;
